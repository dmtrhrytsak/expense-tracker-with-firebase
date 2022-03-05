import React, { useRef } from 'react';

import useAmountInput from '../../hooks/useAmountInput';
import useNameInput from '../../hooks/useNameInput';
import parseAmount from '../../utils/parseAmount';
import { Expense } from '../../types';

type AddExpenseFromProps = {
  onSubmit: (
    expenseName: Expense['name'],
    expenseAmount: Expense['amount']
  ) => Promise<void>;
};

const AddExpenseForm: React.FC<AddExpenseFromProps> = ({ onSubmit }) => {
  const { name, handleNameChange } = useNameInput();
  const { amount, handleAmountChange } = useAmountInput();
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !amount) {
      return;
    }

    onSubmit(name.trim(), parseAmount(amount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount" className="flex flex-col mb-12">
        <span className="font-semibold text-zinc-500">Amount</span>
        <div className="relative flex items-center">
          <input
            type="text"
            id="amount"
            value={amount}
            placeholder="0"
            onChange={handleAmountChange}
            className="w-full p-4 border-b-2 border-black bg-transparent text-4xl outline-none placeholder:text-zinc-500"
          />
          <span className="absolute left-0 text-xl font-semibold">$</span>
          <span className="absolute right-0 text-zinc-500">USD</span>
        </div>
      </label>

      <label
        htmlFor="name"
        className="flex flex-col p-3 mb-4 border border-gray-200 rounded bg-white"
      >
        <span className="font-semibold text-zinc-500">Name</span>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Expense name"
          onChange={handleNameChange}
          onKeyPress={(e) => e.key === 'Enter' && submitBtnRef.current?.click()}
          className="outline-none md:py-2"
        />
      </label>

      <button
        type="submit"
        className="flex w-32 py-2 px-4 items-center justify-center border-2 border-transparent rounded bg-blue-500 text-white hover:border-blue-600 active:bg-blue-600"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
