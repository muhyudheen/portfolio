import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { profile } from '@/data/profile';
import styles from './Nav.module.css';

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo} data-cursor="hover" aria-label="Home">
        {profile.initials}
      </Link>

      <div className={styles.right}>
        <div className={styles.links}>
          <Link to="/project" data-cursor="hover">Projects</Link>
          <Link to="/blog" data-cursor="hover">Blog</Link>
          <Link to="/#about" data-cursor="hover">About</Link>
        </div>

        <button
          className={styles.themeBtn}
          onClick={toggle}
          data-cursor="hover"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span className={styles.icon} aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          <span className={styles.label}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}
