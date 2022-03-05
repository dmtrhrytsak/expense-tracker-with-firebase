import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

import { useAuthContext } from '../contexts/authContext';
import { addExpense } from '../store/features/expenses.slice';
import { useAppDispatch } from '../store/rootReducer';
import { AddExpenseForm } from '../components/Expenses';
import { Expense } from '../types';
import { ProtectedRoute } from '../components/Routes';
import Head from 'next/head';

const AddExpense: NextPage = () => {
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (
    expenseName: Expense['name'],
    expenseAmount: Expense['amount']
  ) => {
    await dispatch(
      addExpense({
        userId: user!.id,
        expense: {
          name: expenseName,
          amount: expenseAmount,
          transactionDay: new Date(),
        } as Expense,
      })
    );

    router.push('/');
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Add Expense | Expense Tracker</title>
      </Head>
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
    </ProtectedRoute>
  );
};

export default AddExpense;
