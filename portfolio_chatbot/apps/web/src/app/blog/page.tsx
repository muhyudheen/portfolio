import Link from 'next/link';

import { blogs } from '@/lib/blogs';
import BlogRouteCursor from './BlogRouteCursor';

export const metadata = {
  title: 'Blog - Muhammed Muhyudeen',
  description: 'Writing about AI, engineering, systems, and portfolio projects.',
};

export default function BlogPage() {
  return (
    <main className="blog-page standard-cursor">
      <BlogRouteCursor />

      <section className="blog-hero">
        <div className="s-label">Writing</div>
        <h1 className="blog-hero-title">
          <span>Notes on</span>
          <span>building</span>
        </h1>
        <p className="blog-hero-copy">
          Project notes, engineering decisions, and lessons from building AI, backend, and automation systems.
        </p>
      </section>

      <section className="blog-list-section">
        <div className="s-header blog-list-header">
          <div>
            <div className="s-label">Latest Posts</div>
            <h2 className="s-title">
              <span className="tl"><span>Blog</span></span>
            </h2>
          </div>
          <div className="s-count">({String(blogs.length).padStart(2, '0')})</div>
        </div>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} className="blog-card" key={blog.slug} data-cursor="view">
              <div className="blog-card-top">
                <span className="pnum">{String(index + 1).padStart(2, '0')}</span>
                <span className="blog-card-read">{blog.readingMinutes} min read</span>
              </div>
              <div className="blog-card-body">
                <h3>{blog.title}</h3>
                <time dateTime={blog.dateTime}>{blog.date}</time>
                <p>{blog.excerpt}</p>
              </div>
              <div className="tags">
                {blog.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
