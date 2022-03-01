import React, { useRef, useState } from 'react';
import { Expense } from '../../types';

export const LEN_LIMIT = 45;

export const validateExpenseAmount = (expenseAmount: string) => {
  const numberRegExp = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/;

  if (!numberRegExp.test(expenseAmount) || expenseAmount.length > 8) {
    return false;
  }

  return true;
};

type AddExpenseFromProps = {
  onSubmit: (
    expenseName: Expense['name'],
    expenseAmount: Expense['amount']
  ) => Promise<void>;
};

const AddExpenseForm: React.FC<AddExpenseFromProps> = ({ onSubmit }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > LEN_LIMIT) {
      return;
    }

    setExpenseName(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!validateExpenseAmount(value)) {
      return;
    }

    setExpenseAmount(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expenseName.trim() || !expenseAmount) {
      return;
    }

    onSubmit(expenseName.trim(), parseFloat(expenseAmount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount" className="flex flex-col mb-12">
        <span className="font-semibold text-zinc-500">Amount</span>
        <div className="relative flex items-center">
          <input
            type="text"
            id="amount"
            name="amount"
            value={expenseAmount}
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
          value={expenseName}
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
