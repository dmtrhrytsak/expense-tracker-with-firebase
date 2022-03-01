import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

import { AddExpenseForm } from '../components/Expenses';
import { addExpense } from '../store/features/expenses.slice';
import { useAppDispatch } from '../store/rootReducer';
import { Expense } from '../types';

const AddExpense: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (
    expenseName: Expense['name'],
    expenseAmount: Expense['amount']
  ) => {
    await dispatch(
      addExpense({
        name: expenseName,
        amount: Math.round(expenseAmount * 100) / 100,
        transactionDay: new Date(),
      } as Expense)
    );

    router.push('/');
  };

  return (
    <section>
      <div className="flex gap-2 items-center mb-8">
        <Link href="/">
          <a>
            <IoIosArrowBack className="text-lg" />
          </a>
        </Link>
        <h3 className="text-xl font-bold">Add Expense</h3>
      </div>

      <AddExpenseForm onSubmit={onSubmit} />
    </section>
  );
};

export default AddExpense;
