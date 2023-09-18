'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeSelector: React.FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value={currentTheme == 'business' ? 'emerald' : 'business'}
        checked={currentTheme === 'business' ? true : false}
        onChange={(e) => {
          setTheme(e.currentTarget.value);
        }}
      />
      <BsFillSunFill className="swap-off" />
      <BsFillMoonFill className="swap-on" />
    </label>
  );
};

export default ThemeSelector;
