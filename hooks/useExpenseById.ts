import { useEffect, useState } from 'react';

import { getExpenseById } from '../services/firestore/firestore.helpers';
import { useAuthContext } from '../contexts/authContext';
import { Expense } from '../types';

export const useExpenseById = (expenseId: string) => {
  const [expense, setExpense] = useState<Expense | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const expense = await getExpenseById(user!.id, expenseId);

      if (!expense) {
        setNotFound(true);

        return;
      }

      setExpense(expense);
    };

    fetchData();
  }, [user, expenseId]);

  return { expense, notFound };
};
