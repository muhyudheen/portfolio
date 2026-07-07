import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const current = document.documentElement.getAttribute('data-theme');
  return current === 'light' ? 'light' : 'dark';
}

/**
 * Theme is applied pre-paint by an inline script in index.html.
 * This hook keeps React state in sync and persists user choice.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
