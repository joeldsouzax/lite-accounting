import Logo from '@/components/Logo';
import ThemeSelector from '@/components/ThemeSelector';

export default async function SignIn() {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <header className="max-w-xs w-full navbar lg:max-w-lg transition-all ease-out duration-100">
        <nav className="navbar-start">
          <a href="/">
            <Logo />
          </a>
        </nav>
        <nav className="navbar-end flex gap-4">
          <ThemeSelector />
        </nav>
      </header>
    </main>
  );
}
