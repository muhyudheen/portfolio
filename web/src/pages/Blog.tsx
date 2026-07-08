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
        {blogs.map((blog, i) => (
          <Reveal key={blog.slug} y={32}>
            <Link to={`/blog/${blog.slug}`} className={styles.card}>
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
