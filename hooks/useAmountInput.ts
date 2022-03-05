import { useEffect, useState } from 'react';

const validateExpenseAmount = (expenseAmount: string) => {
  const numberRegExp = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/;

  if (!numberRegExp.test(expenseAmount) || expenseAmount.length > 8) {
    return false;
  }

  return true;
};

const useAmountInput = (initialState?: string) => {
  const [amount, setAmount] = useState(initialState || '');

  useEffect(() => {
    setAmount(initialState || '');
  }, [initialState]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!validateExpenseAmount(value)) {
      return;
    }

    setAmount(value);
  };

  return { amount, handleAmountChange };
};

export default useAmountInput;
