import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlog } from '@/data/blogs';
import type { Block } from '@/data/blogs';
import BlogEngagement from '@/components/BlogEngagement/BlogEngagement';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import NotFound from './NotFound';
import styles from './BlogPost.module.css';

/**
 * Lightweight inline renderer for a small Markdown subset used in post text:
 * [label](url), **bold**, *italic*, and `inline code`. Plain text passes through
 * untouched. A fresh regex per call keeps recursion (e.g. code inside bold) safe.
 */
function renderInline(text: string): ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      const href = match[2];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a key={key++} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {renderInline(match[1])}
        </a>,
      );
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={key++}>{renderInline(match[3])}</strong>);
    } else if (match[4] !== undefined) {
      nodes.push(<em key={key++}>{renderInline(match[4])}</em>);
    } else if (match[5] !== undefined) {
      nodes.push(<code key={key++} className={styles.inlineCode}>{match[5]}</code>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className={styles.h2}>{block.text}</h2>;
    case 'ul':
      return (
        <ul key={i} className={styles.ul}>
          {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className={styles.ol}>
          {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
        </ol>
      );
    case 'code':
      return (
        <pre key={i} className={styles.pre}>
          <code>{block.text}</code>
        </pre>
      );
    case 'p':
    default:
      return <p key={i}>{renderInline(block.text)}</p>;
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

  const nextBlog = blog.next ? getBlog(blog.next) : undefined;

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

        {nextBlog && (
          <Link to={`/blog/${nextBlog.slug}`} className={styles.nextPost}>
            <span className={styles.nextLabel}>Next post →</span>
            <span className={styles.nextTitle}>{nextBlog.title}</span>
          </Link>
        )}

        <BlogEngagement />
      </div>
    </article>
  );
}
