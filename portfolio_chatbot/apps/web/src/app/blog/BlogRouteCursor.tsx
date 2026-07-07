'use client';

import { useEffect } from 'react';

export default function BlogRouteCursor() {
  useEffect(() => {
    const win = window as typeof window & {
      gsap?: any;
      ScrollTrigger?: any;
    };

    document.body.classList.add('blog-route');
    const nav = document.querySelector('nav');
    const preloader = document.getElementById('preloader');
    const themeBtn = document.getElementById('themeToggle');
    const tIcon = themeBtn?.querySelector('.t-icon');
    const tLabel = themeBtn?.querySelector('.t-label');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let navTrigger: any;
    let fallbackScrollHandler: (() => void) | undefined;

    const syncThemeButton = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      if (tIcon) tIcon.textContent = isLight ? '☾' : '☀';
      if (tLabel) tLabel.textContent = isLight ? 'Dark' : 'Light';
    };

    const onThemeClick = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      syncThemeButton();
    };

    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    syncThemeButton();
    themeBtn?.addEventListener('click', onThemeClick);

    const toggleScrolledNav = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 50);
    };

    const hidePreloader = () => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
      }
    };

    const init = () => {
      if (cancelled) return;

      const gsap = win.gsap;
      const ScrollTrigger = win.ScrollTrigger;

      if (!gsap || reduceMotion) {
        hidePreloader();
        toggleScrolledNav();
        fallbackScrollHandler = toggleScrolledNav;
        window.addEventListener('scroll', fallbackScrollHandler, { passive: true });
        return;
      }

      if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        navTrigger = ScrollTrigger.create({
          start: 'top -50',
          end: 99999,
          toggleClass: { className: 'scrolled', targets: 'nav' },
        });
      } else {
        toggleScrolledNav();
        fallbackScrollHandler = toggleScrolledNav;
        window.addEventListener('scroll', fallbackScrollHandler, { passive: true });
      }

      const timeline = gsap.timeline();
      timeline
        .to('.pl-name-inner', { y: '0%', duration: 0.8, ease: 'power4.out' })
        .to('.pl-bar', { width: '100%', duration: 0.9, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }, '-=0.4')
        .to(preloader, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' })
        .fromTo('.nav-logo, .nav-right', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
        .fromTo('.blog-hero .s-label, .blog-hero-copy', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }, '-=0.35')
        .fromTo('.blog-hero-title span', { y: '110%' }, { y: '0%', duration: 0.85, stagger: 0.08, ease: 'power4.out' }, '-=0.45')
        .fromTo('.blog-card, .blog-post-shell', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, '-=0.25')
        .add(() => ScrollTrigger?.refresh());
    };

    const waitForGsap = (attempt = 0) => {
      if (win.gsap || attempt >= 20) {
        init();
        return;
      }

      window.setTimeout(() => waitForGsap(attempt + 1), 100);
    };

    waitForGsap();

    return () => {
      cancelled = true;
      nav?.classList.remove('scrolled');
      navTrigger?.kill();
      if (fallbackScrollHandler) window.removeEventListener('scroll', fallbackScrollHandler);
      themeBtn?.removeEventListener('click', onThemeClick);
      document.body.classList.remove('blog-route');
    };
  }, []);

  return null;
}
