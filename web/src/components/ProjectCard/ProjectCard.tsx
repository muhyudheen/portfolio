import { Link } from 'react-router-dom';
import type { Project } from '@/data/profile';
import styles from './ProjectCard.module.css';

const STATUS_LABEL: Record<Project['status'], string> = {
  'in-progress': 'In progress',
  planned: 'Planned',
  shipped: 'Shipped',
};

function ArrowMark() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="19" x2="19" y2="5" />
        <polyline points="5 5 19 5 19 19" />
      </svg>
    </span>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = (
    <>
      <div className={`${styles.vis} ${styles[`a_${project.accent}`]}`}>
        <span className={styles.bigIndex}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <ArrowMark />
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <span className={styles.num}>{String(index + 1).padStart(2, '0')} / Project</span>
          <span className={`${styles.status} ${styles[`s_${project.status}`]}`}>
            <span className={styles.statusDot} />
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <div className={styles.mid}>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div className={styles.bot}>
          <div className="tags">
            {project.stack.map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
          <span className={styles.year}>{project.year}</span>
        </div>
      </div>
    </>
  );

  return (
    <Link to={`/project/${project.slug}`} className={styles.card} data-cursor="view">
      {inner}
    </Link>
  );
}
