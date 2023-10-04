import ListLedgers from './list-ledgers';

// TODO: show ledger list
export default function Home() {
  return (
    <section
      id="user-settings"
      className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100"
    >
      <ListLedgers />
    </section>
  );
}
