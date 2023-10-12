import { FC } from 'react';
import TransactionForm from './transaction-form';

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

      <TransactionModal name="transaction-modal">
        <TransactionForm />
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
      <div className="modal modal-bottom md:modal-middle ">
        <div className="modal-box">
          <div className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100">
            {children}
          </div>
          <div className="modal-action">
            <label htmlFor={name} className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
