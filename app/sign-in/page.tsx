import Logo from '@/components/Logo';
import ThemeSelector from '@/components/ThemeSelector';
import { getSession } from '../supabase-server';
import { redirect } from 'next/navigation';
import Auth from '@/components/Auth';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }
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
      <Auth />
    </main>
  );
}
