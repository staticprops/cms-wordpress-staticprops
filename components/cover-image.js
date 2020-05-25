import cn from 'classnames'
import Link from 'next/link'
import Img from 'gatsby-image'

export default function CoverImage({ title, responsiveImage, slug, hero }) {
  const image = (
    <Img
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      fluid={{
        ...responsiveImage,
        sizes: `(min-width: 640px) 100vw, ${hero ? '1240px' : '556px'}`,
      }}
    />
  )

  return (
    <div className='-mx-5 sm:mx-0'>
      {slug ? (
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
