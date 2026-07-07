'use client';

import { FormEvent, useState } from 'react';

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

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setComments((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim() || 'Anonymous',
        message: trimmedMessage,
      },
    ]);
    setName('');
    setMessage('');
  }

  return (
    <section className="blog-engagement" aria-label="Blog reactions and comments">
      <button
        className={`blog-like-btn${liked ? ' is-liked' : ''}`}
        type="button"
        onClick={() => setLiked((value) => !value)}
        aria-pressed={liked}
      >
        <span>{liked ? 'Liked' : 'Like this post'}</span>
        <strong>{liked ? 1 : 0}</strong>
      </button>

      <div className="comment-panel">
        <div className="comment-head">
          <h2>Comments</h2>
          <span>{comments.length}</span>
        </div>

        <form className="comment-form" onSubmit={addComment}>
          <label>
            <span>Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Comment</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share a thought..."
              rows={4}
            />
          </label>
          <button className="cv-btn comment-submit" type="submit">Post Comment</button>
        </form>

        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="comment-empty">No comments yet. Be the first one.</p>
          ) : (
            comments.map((comment) => (
              <article className="comment-item" key={comment.id}>
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
