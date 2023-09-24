import { getSession, getUserDetails } from '../supabase-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const session = await getSession();

  if (!session) {
    return redirect('/sign-in');
  }

  return <h1>Hello</h1>;
}
