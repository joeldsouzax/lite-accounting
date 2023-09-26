import { createServerSupabaseClient } from '@/app/supabase-server';
import Link from 'next/link';
import * as React from 'react';
import SignOut from './SignOut';
import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';

export default async function Authentication() {
  const supabase = createServerSupabaseClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <>
      {user.user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={user.user.user_metadata.picture!}
                width={10}
                height={10}
                alt={user.user.user_metadata.full_name!}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-lg lg:menu-sm transition-all ease-linear duration-100 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={'/home/settings'}>
                <FiSettings />
                Settings
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
          </ul>
        </div>
      ) : (
        <Link className="link link-hover" href="/sign-in">
          Sign in
        </Link>
      )}
    </>
  );
}
