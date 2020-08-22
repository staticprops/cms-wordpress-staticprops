import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  featuredImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className='mb-8 md:mb-16'>
        <CoverImage
          title={title}
          responsiveImage={featuredImage}
          slug={slug}
          hero
        />
      </div>
      <div className='mb-20 md:grid md:grid-cols-2 md:gap-y-16 lg:gap-y-8 md:mb-28'>
        <div>
          <h3 className='mb-4 text-4xl leading-tight lg:text-6xl'>
            <Link as={`/posts/${slug}`} href='/posts/[slug]'>
              <a className='hover:underline'>{title}</a>
            </Link>
          </h3>
          <div className='mb-4 text-lg md:mb-0'>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className='mb-4 text-lg leading-relaxed'
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar name={author.name} picture={author.avatar} />
        </div>
      </div>
    </section>
  );
}
