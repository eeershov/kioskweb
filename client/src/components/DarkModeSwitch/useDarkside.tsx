import { useEffect, useState } from 'react';

export default function useDarkSide(): ["dark" | "light", React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState(localStorage.theme as string);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}