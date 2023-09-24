import { getSession, getUserDetails } from '../supabase-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return redirect('/sign-in');
  }
  return (
    <main
      id="lite-regnskap-home"
      className="px-4 md:px-2 container md:max-w-md"
    >
      {children}
    </main>
  );
}
