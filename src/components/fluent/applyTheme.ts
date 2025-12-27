
import theme from '../../theme.json' assert { type: 'json' };

export function applyThemeToRoot() {
  if (typeof document === 'undefined') return;
  Object.entries(theme as Record<string, string>).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, String(value));
  });
}
