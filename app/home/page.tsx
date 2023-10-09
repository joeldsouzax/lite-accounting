import TransactionCreate from './transaction-create';

// TODO: show ledger list
export default function Home() {
  return (
    <section
      id="trasaction-create"
      className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100"
    >
      <TransactionCreate />
    </section>
  );
}
