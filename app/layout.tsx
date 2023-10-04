import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Logo from './logo';
import ThemeSelector from './theme-selector';
import Footer from './footer';
import NavMenu from './nav-menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiteRegnskap',
  description: 'LiteRegnskap',
};

export const dynamic = 'force-dynamic';
export default async function RootLayout({
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
          <div className="px-2 md:px-0 transition-all ease-linear duration-200 shadow-md">
            <header className="navbar container md:max-w-md">
              <nav className="navbar-start">
                <a href="/">
                  <Logo />
                </a>
              </nav>
              <nav className="navbar-end flex gap-4">
                <ThemeSelector />
                <NavMenu />
              </nav>
            </header>
          </div>
          {children}
          <div className="divider" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
