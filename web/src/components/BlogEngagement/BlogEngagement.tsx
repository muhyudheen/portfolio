import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './BlogEngagement.module.css';

type Comment = {
  id: number;
  name: string;
  message: string;
};

export default function BlogEngagement() {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setComments((current) => [
      ...current,
      { id: Date.now(), name: name.trim() || 'Anonymous', message: trimmed },
    ]);
    setName('');
    setMessage('');
  }

  return (
    <section className={styles.engagement} aria-label="Blog reactions and comments">
      <button
        className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
        type="button"
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
      >
        <span>{liked ? 'Liked' : 'Like this post'}</span>
        <strong>{liked ? 1 : 0}</strong>
      </button>

      <div className={styles.panel}>
        <div className={styles.head}>
          <h2>Comments</h2>
          <span>{comments.length}</span>
        </div>

        <form className={styles.form} onSubmit={addComment}>
          <label>
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label>
            <span>Comment</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share a thought…"
              rows={4}
            />
          </label>
          <button className="btn btn--accent" type="submit">Post comment</button>
        </form>

        <div className={styles.list}>
          {comments.length === 0 ? (
            <p className={styles.empty}>No comments yet. Be the first one.</p>
          ) : (
            comments.map((comment) => (
              <article className={styles.item} key={comment.id}>
                <h3>{comment.name}</h3>
                <p>{comment.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
