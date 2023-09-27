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
      className="mt-4 md:mt-8 transition-all ease-linear duration-100"
    >
      {children}
    </main>
  );
}
