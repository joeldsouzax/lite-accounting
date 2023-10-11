/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/settings/page.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 9:09:22 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

// TODO: delete account option
import DeleteAccount from './delete-user';

export const dynamic = 'force-dynamic';
export default async function Settings() {
  return (
    <>
      <section
        id="user-settings"
        className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100"
      >
        <article className="prose"></article>
      </section>
      <section
        className="px-4 md:px-2 container md:max-w-md"
        id="important-account-settings"
      >
        <DeleteAccount />
      </section>
    </>
  );
}
