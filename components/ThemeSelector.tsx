'use client';

import { useCurrentTheme } from '@/hooks';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useCurrentTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value={currentTheme == 'dark' ? 'emerald' : 'dark'}
        checked={currentTheme === 'dark' ? true : false}
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
