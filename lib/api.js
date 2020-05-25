const API_URL = 'https://wp.staticprops.com/nextjs-demo/graphql'
// API_TOKEN Only using public

const featuredImageFragment = `
fragment featuredImageFragment on MediaItem {
  src: sourceUrl
  srcSet
  mimeType
  alt: altText
  mediaDetails {
    height
    width
  }
}
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
  query getAllPosts {
    posts{
      nodes{
        slug
      }
    }
  }
  `)
  return data?.posts?.nodes
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query allPostsForHome {
      posts(where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          title
          slug
          uri
          excerpt
          date
          featuredImage {
            ...featuredImageFragment
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
    }
    
    ${featuredImageFragment}
    `,
    { preview }
  )
  // calculate aspecratio on server and add base64 from url
  // const getPosts = async () => {
  //   return Promise.all()
  // }
  return await getPosts(data.posts.nodes)
}

export async function getPostAndMorePosts(slug, preview) {
  const { post } = await fetchAPI(
    `
    query postBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        databaseId
        title
        slug
        content
        date
        featuredImage {
          ...featuredImageFragment
        }
        author {
          name
          avatar {
            url
          }
        }
      }
    }
    ${featuredImageFragment}
    `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  const { morePosts } = await fetchAPI(
    `
    query morePosts($postId: ID) {
      morePosts: posts(first: 2,where: {orderby: {field: DATE, order: DESC}, notIn: [$postId]}) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            ...featuredImageFragment
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
    }
    ${featuredImageFragment}
    `,
    {
      preview,
      variables: {
        postId: post.databaseId,
      },
    }
  )

  return {
    post: { ...post, featuredImage: await fluidImage(post.featuredImage) },
    morePosts: await getPosts(morePosts.nodes),
  }
}
const getPosts = async (nodes) => {
  return Promise.all(
    nodes.map(async (post) => {
      return {
        ...post,
        featuredImage: await fluidImage(post.featuredImage),
      }
    })
  )
}
const fluidImage = async ({ src, mimeType, mediaDetails, ...rest }) => {
  return {
    aspectRatio: mediaDetails.width / mediaDetails.height,
    base64: await convertBase64(src.split(' ')[0], mimeType),
    ...rest,
  }
}
const convertBase64 = async (url, mimeType) => {
  // Proof of Concept: heavy processing on build time, could also expand add webp srcSet, or opt for traceSVG/
  // use with care while dev, using memory buffer and processing for every build/hit reload
  // TODO If isDev Skip

  const sharp = require('sharp')
  const response = await fetch(url, { encoding: null })
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  const buffer = await response.arrayBuffer()
  const resizedImageBuf = await sharp(Buffer.from(buffer)).resize(24).toBuffer()
  return `data:${mimeType};base64,${resizedImageBuf.toString('base64')}`
}
