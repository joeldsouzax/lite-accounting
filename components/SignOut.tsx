'use client';

import { useSupabase } from '@/app/providers';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button className="btn" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
