import { Link } from 'react-router-dom';
import { blogs } from '@/data/blogs';
import Reveal from '@/components/Reveal/Reveal';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import styles from './Blog.module.css';

export default function Blog() {
  useDocumentMeta({
    title: 'Blog',
    description:
      'Writing about AI, engineering, systems, and portfolio projects by Muhammed Muhyudheen.',
  });

  // Pinned posts first, then newest by date.
  const ordered = [...blogs].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return b.dateTime.localeCompare(a.dateTime);
  });

  return (
    <section className={`section container ${styles.page}`}>
      <header className={styles.hero}>
        <span className="eyebrow">Writing</span>
        <h1 className={`display ${styles.title}`}>
          <span>Notes on</span>
          <span>building</span>
        </h1>
        <p className={styles.copy}>
          Project notes, engineering decisions, and lessons from building AI, backend, and
          automation systems.
        </p>
      </header>

      <div className={styles.listHeader}>
        <div>
          <span className="eyebrow">Latest posts</span>
          <h2 className={`display ${styles.listTitle}`}>Blog</h2>
        </div>
        <span className={styles.count}>({String(blogs.length).padStart(2, '0')})</span>
      </div>

      <div className={styles.grid}>
        {ordered.map((blog, i) => (
          <Reveal key={blog.slug} y={32}>
            <Link to={`/blog/${blog.slug}`} className={`${styles.card} ${blog.pinned ? styles.pinned : ''}`}>
              {blog.pinned && (
                <span className={styles.pin} title="Pinned" aria-label="Pinned post">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="17" x2="12" y2="22" />
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                  </svg>
                </span>
              )}
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.cardRead}>{blog.readingMinutes} min read</span>
              </div>

              <div className={styles.cardBody}>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
