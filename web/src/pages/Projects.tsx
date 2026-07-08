import { projects } from '@/data/profile';
import Reveal from '@/components/Reveal/Reveal';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import styles from './Projects.module.css';

export default function Projects() {
  useDocumentMeta({
    title: 'Projects',
    description:
      'Machine learning, agentic AI, and backend systems by Muhammed Muhyudheen — from regulatory monitoring to race-strategy prediction.',
  });

  return (
    <section className={`section container ${styles.page}`}>
      <header className={styles.head}>
        <span className="eyebrow">Selected work</span>
        <h1 className={`display ${styles.title}`}>Projects</h1>
        <p className={styles.copy}>
          Machine learning, agentic AI, and backend systems I’m building — from regulatory
          monitoring to race-strategy prediction.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} y={40}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
