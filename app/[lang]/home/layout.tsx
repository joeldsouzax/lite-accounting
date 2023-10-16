import { FC } from 'react';
import TransactionForm from './transaction-form';
import { AiOutlineClose } from 'react-icons/ai';

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
      <div className="modal modal-bottom md:modal-middle h-3/4">
        <div className="modal-box">
          <div className="container md:max-w-md transition-all ease-linear duration-100">
            {children}
          </div>
          <div className="modal-action">
            <label
              htmlFor={name}
              className="btn btn-outline btn-sm btn-error w-full"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
