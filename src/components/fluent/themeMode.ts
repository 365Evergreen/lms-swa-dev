
import theme from '../../theme.json' assert { type: 'json' };

export function setThemeMode(mode: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  if (mode === 'dark') {
    document.documentElement.style.setProperty('--background', theme.darkBackground);
    document.documentElement.style.setProperty('--text', theme.darkText);
  } else {
    document.documentElement.style.setProperty('--background', theme.lightBackground);
    document.documentElement.style.setProperty('--text', theme.lightText);
  }
}

export function getInitialThemeMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('themeMode');
  if (stored === 'dark' || stored === 'light') return stored;
  // Fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function persistThemeMode(mode: 'light' | 'dark') {
  if (typeof window !== 'undefined') {
    localStorage.setItem('themeMode', mode);
  }
}
