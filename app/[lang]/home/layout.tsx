import { FC } from 'react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="lite-regnskap-home"
      className="mt-4 md:mt-8 transition-all ease-linear duration-100"
    >
      {children}

      <TransactionModal name="transaction-withdrawal-modal">
        <h3 className="text-lg font-bold">Withdrawal</h3>
        <p className="py-4">This modal works with a hidden checkbox!</p>
      </TransactionModal>

      <TransactionModal name="deposit-withdrawal-modal">
        <h3 className="text-lg font-bold">Deposit</h3>
        <p className="py-4">This modal works with a hidden checkbox!</p>
      </TransactionModal>
    </main>
  );
}

interface TransactionModalProps {
  children: React.ReactNode;
  name: string;
}

const TransactionModal: FC<TransactionModalProps> = ({ children, name }) => {
  return (
    <>
      <input type="checkbox" id={name} name={name} className="modal-toggle" />
      <div className="modal modal-bottom md:modal-top ">
        <div className="modal-box">
          <div className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100">
            {children}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={name}>
          Close
        </label>
      </div>
    </>
  );
};
