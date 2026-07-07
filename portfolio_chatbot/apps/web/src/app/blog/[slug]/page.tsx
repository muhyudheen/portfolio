import Link from 'next/link';
import { notFound } from 'next/navigation';

import BlogRouteCursor from '../BlogRouteCursor';
import { blogs, getBlog } from '@/lib/blogs';
import BlogEngagement from './BlogEngagement';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found - Muhammed Muhyudeen',
    };
  }

  return {
    title: `${blog.title} - Muhammed Muhyudeen`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) notFound();

  return (
    <main className="blog-post-page standard-cursor">
      <BlogRouteCursor />

      <article className="blog-post-shell">
        <Link href="/blog" className="blog-back-link">Back to blog</Link>

        <header className="blog-post-header">
          <div className="s-label">Blog</div>
          <h1>{blog.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={blog.dateTime}>{blog.date}</time>
            <span>{blog.readingMinutes} min read</span>
          </div>
          <div className="tags">
            {blog.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-post-content">
          {blog.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <BlogEngagement />
      </article>
    </main>
  );
}
