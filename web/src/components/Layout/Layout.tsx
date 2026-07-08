import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

/** Scroll to top on navigation, or to the hash target if one is present. */
function useScrollBehavior() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
}

export default function Layout() {
  useScrollBehavior();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
