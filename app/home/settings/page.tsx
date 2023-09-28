// TODO: delete account option
// TODO: delete can be a server action for now
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
        <div id="account-delete-card" className="card shadow-md">
          <div className="card-body">
            <h2 className="card-title text-error">Delete account</h2>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="btn btn-error btn-outline btn-sm" type="submit">
              Delete your Account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
