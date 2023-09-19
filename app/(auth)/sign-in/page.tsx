import Logo from '@/components/Logo';
import ThemeSelector from '@/components/ThemeSelector';
import { getSession } from '../../supabase-server';
import { redirect } from 'next/navigation';
import Auth from '@/components/Auth';

export const dynamic = 'force-dynamic';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }
  return (
    <main className="container md:max-w-xs px-4 md:px-0">
      <Auth />
    </main>
  );
}
