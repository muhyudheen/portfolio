import { Link, useParams } from 'react-router-dom';
import { getProject } from '@/data/profile';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import NotFound from './NotFound';
import styles from './ProjectDetail.module.css';

const STATUS_LABEL = {
  'in-progress': 'In progress',
  planned: 'Planned',
  shipped: 'Shipped',
  'coming-soon': 'Coming soon',
} as const;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  useDocumentMeta({
    title: project ? project.name : 'Project not found',
    description: project?.tagline,
  });

  if (!project) return <NotFound />;

  const body = project.overview ?? [project.description];

  return (
    <article className={`section container ${styles.page}`}>
      <Link to="/project" className={styles.back} data-cursor="hover">← All projects</Link>

      <header className={styles.header}>
        <div className={styles.metaRow}>
          {project.status && (
            <span className={`${styles.status} ${styles[`s_${project.status}`]}`}>
              <span className={styles.dot} />
              {STATUS_LABEL[project.status]}
            </span>
          )}
          <span className={styles.year}>{project.year}</span>
        </div>

        <h1 className={`display ${styles.title}`}>{project.name}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.body}>
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <h2 className={styles.h2}>Highlights</h2>
          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.side}>
          <div className={styles.sideGroup}>
            <h3 className={styles.sideH}>Stack</h3>
            <div className="tags">
              {project.stack.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          </div>

          {project.links && project.links.length > 0 && (
            <div className={styles.sideGroup}>
              <h3 className={styles.sideH}>Links</h3>
              <div className={styles.links}>
                {project.links.map((link) =>
                  link.external ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" data-cursor="external">
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link key={link.href} to={link.href} data-cursor="hover">
                      {link.label} →
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
