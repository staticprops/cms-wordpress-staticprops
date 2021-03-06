import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className='mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl'>
        More Stories
      </h2>
      <div className='grid grid-cols-1 row-gap-20 mb-32 md:grid-cols-2 md:gap-y-16 lg:gap-y-32 md:gap-x-32'>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.featuredImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
