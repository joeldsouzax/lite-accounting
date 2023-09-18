import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiteRegnskap',
  description: 'LiteRegnskap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="dark"
      suppressHydrationWarning={true}
    >
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
