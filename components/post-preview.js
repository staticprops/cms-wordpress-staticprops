import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <div>
      <div className='mb-5'>
        <CoverImage slug={slug} title={title} responsiveImage={coverImage} />
      </div>
      <h3 className='mb-3 text-3xl leading-snug'>
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a className='hover:underline'>{title}</a>
        </Link>
      </h3>
      <div className='mb-4 text-lg'>
        <Date dateString={date} />
      </div>
      <div
        className='mb-4 text-lg leading-relaxed'
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></div>
      <Avatar name={author.name} picture={author.avatar} />
    </div>
  )
}
