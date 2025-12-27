import Header from './components/fluent/Header';

import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { setThemeMode, getInitialThemeMode, persistThemeMode } from './components/fluent/themeMode';
import { Hero } from './components/fluent/Hero';



function App() {
  const [count, setCount] = useState(0);
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>(getInitialThemeMode());

  useEffect(() => {
    setThemeMode(themeMode);
    persistThemeMode(themeMode);
    document.body.style.background = `var(--background)`;
    document.body.style.color = `var(--text)`;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Header />
      <Hero />
      <div style={{ marginTop: 56 }}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button style={{ marginLeft: 16 }} onClick={toggleTheme}>
            Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App
