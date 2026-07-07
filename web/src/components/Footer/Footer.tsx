import { profile } from '@/data/profile';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={`section ${styles.footer}`}>
      <div className="container">
        <span className="eyebrow">Get in touch</span>
        <h2 className={`display ${styles.headline}`}>
          Let’s build something <a href={`mailto:${profile.email}`} data-cursor="hover">together.</a>
        </h2>

        <div className={styles.row}>
          <div className={styles.left}>
            <a href={`mailto:${profile.email}`} className={styles.email} data-cursor="hover">
              {profile.email}
            </a>
            <p>Open to internships, research, and freelance work.</p>
          </div>

          <div className={styles.socials}>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" data-cursor="external">LinkedIn</a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" data-cursor="external">GitHub</a>
          </div>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
