import * as React from 'react';
import { useTheme } from 'next-themes';

export const useCurrentTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return {
    currentTheme,
    setTheme,
  };
};
