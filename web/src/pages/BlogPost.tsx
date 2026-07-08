import { Link, useParams } from 'react-router-dom';
import { getBlog } from '@/data/blogs';
import type { Block } from '@/data/blogs';
import BlogEngagement from '@/components/BlogEngagement/BlogEngagement';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import NotFound from './NotFound';
import styles from './BlogPost.module.css';

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className={styles.h2}>{block.text}</h2>;
    case 'ul':
      return (
        <ul key={i} className={styles.ul}>
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className={styles.ol}>
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      );
    case 'p':
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const blog = slug ? getBlog(slug) : undefined;

  useDocumentMeta({
    title: blog ? blog.title : 'Post not found',
    description: blog?.excerpt,
  });

  if (!blog) return <NotFound />;

  return (
    <article className={`section container ${styles.page}`}>
      <div className={styles.shell}>
        <Link to="/blog" className={styles.back}>← Back to blog</Link>

        <header className={styles.header}>
          <span className="eyebrow">Blog</span>
          <h1 className={`display ${styles.title}`}>{blog.title}</h1>
          <div className={styles.meta}>
            <time dateTime={blog.dateTime}>{blog.date}</time>
            <span>{blog.readingMinutes} min read</span>
          </div>
          <div className="tags">
            {blog.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className={styles.content}>
          {blog.blocks.map(renderBlock)}
        </div>

        <BlogEngagement />
      </div>
    </article>
  );
}
