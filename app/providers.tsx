'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

interface ProviderProps extends React.PropsWithChildren {}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return <ThemeProvider themes={['dark', 'emerald']}>{children}</ThemeProvider>;
};

export default Providers;
