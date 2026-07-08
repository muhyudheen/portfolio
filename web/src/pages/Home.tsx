import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile, marquee, projects, aboutBio, education, skills } from '@/data/profile';
import Reveal from '@/components/Reveal/Reveal';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import styles from './Home.module.css';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Home() {
  useDocumentMeta({
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  });

  return (
    <>
      {/* ----------------------------- HERO ----------------------------- */}
      <header className={styles.hero}>
        <div className="container">
          <motion.span
            className={`eyebrow ${styles.heroEyebrow}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {profile.role}
          </motion.span>

          <h1 className={`display ${styles.heroTitle}`}>
            {['Muhammed', 'Muhyudheen'].map((word, i) => (
              <span key={word} className={styles.lineMask}>
                <motion.span
                  className={styles.line}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className={styles.heroBottom}>
            <motion.p
              className={styles.heroDesc}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className={styles.heroRight}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
            >
              {profile.available && (
                <span className={`pill ${styles.available}`}>
                  <span className={styles.availDot} />
                  Available for work
                </span>
              )}
              <a href="#work" className="btn" data-cursor="hover">
                View work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ---------------------------- MARQUEE ---------------------------- */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marquee, ...marquee].map((item, i) => (
            <span className={styles.mqItem} key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ----------------------------- WORK ----------------------------- */}
      <section id="work" className="section container">
        <div className={styles.sHeader}>
          <div>
            <span className="eyebrow">Selected projects</span>
            <h2 className={`display ${styles.sTitle}`}>Featured Work</h2>
          </div>
          <span className={styles.count}>({String(projects.length).padStart(2, '0')})</span>
        </div>

        <div className={styles.projects}>
          {projects.map((project, i) => (
            <Reveal key={project.slug} y={40}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <div className={styles.workMore}>
          <Link to="/project" className="btn" data-cursor="hover">
            View all projects
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ----------------------------- ABOUT ---------------------------- */}
      <section id="about" className="section container">
        <div className={styles.sHeader}>
          <div>
            <span className="eyebrow">About me</span>
            <h2 className={`display ${styles.sTitle}`}>Background</h2>
          </div>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.bio}>
            {aboutBio.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{para.text}</p>
              </Reveal>
            ))}
          </div>

          <div className={styles.aboutSide}>
            <div className={styles.detailGroup}>
              <h3 className={styles.detailH}>Education</h3>
              <ul className={styles.eduList}>
                {education.map((e) => (
                  <li key={e.institution} className={styles.eduItem}>
                    <div>
                      <span className={styles.eduInst}>{e.institution}</span>
                      <span className={styles.eduDetail}>{e.detail}</span>
                    </div>
                    <span className={styles.eduPeriod}>{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailGroup}>
              <h3 className={styles.detailH}>Core stack</h3>
              <div className={styles.skills}>
                {skills.map((s) => (
                  <span className={styles.skill} key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.detailGroup}>
              <h3 className={styles.detailH}>Elsewhere</h3>
              <div className={styles.elsewhere}>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" data-cursor="external">LinkedIn ↗</a>
                <a href={profile.socials.github} target="_blank" rel="noreferrer" data-cursor="external">GitHub ↗</a>
                <Link to="/blog" data-cursor="hover">Blog →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
