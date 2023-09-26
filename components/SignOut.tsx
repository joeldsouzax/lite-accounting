'use client';

import { useSupabase } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from 'react-icons/ai';

export default function SignOut() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button onClick={handleSignOut}>
      <AiOutlineLogout />
      Sign out
    </button>
  );
}
