import ThemeSelector from '@/components/ThemeSelector';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <header className="max-w-xs w-full navbar lg:max-w-lg transition-all ease-out duration-75">
        <nav className="navbar-start">liteRengskap</nav>
        <nav className="navbar-end">
          <ThemeSelector />
        </nav>
      </header>
    </main>
  );
}
