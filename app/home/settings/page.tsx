// TODO: delete account option

import DeleteUser from './delete-user';

export const dynamic = 'force-dynamic';
// TODO: add a modal before executing the delete option
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
        <DeleteUser />
      </section>
    </>
  );
}
