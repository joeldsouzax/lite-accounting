import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Logo from '@/components/Logo';
import ThemeSelector from '@/components/ThemeSelector';
import Footer from '@/components/Footer';

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
        <Providers>
          <div className="px-2 md:px-0 transition-all ease-linear duration-200 shadow-md mb-4">
            <header className="navbar container md:max-w-md">
              <nav className="navbar-start">
                <a href="/">
                  <Logo />
                </a>
              </nav>
              <nav className="navbar-end flex gap-4">
                <ThemeSelector />
                <a className="link link-hover" href="/sign-in">
                  Sign in
                </a>
              </nav>
            </header>
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
