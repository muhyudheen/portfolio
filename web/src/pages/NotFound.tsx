import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

/** Fixes the original's dead /showcase link with a real 404. */
export default function NotFound() {
  useDocumentMeta({ title: 'Page not found' });

  return (
    <section
      className="container"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <span className="eyebrow">Error 404</span>
      <h1 className="display" style={{ fontSize: 'clamp(64px, 16vw, 200px)' }}>
        Lost the thread.
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: 420 }}>
        This page doesn’t exist (or hasn’t been built yet).
      </p>
      <Link to="/" className="btn" data-cursor="hover" style={{ alignSelf: 'flex-start' }}>
        Back home
      </Link>
    </section>
  );
}
