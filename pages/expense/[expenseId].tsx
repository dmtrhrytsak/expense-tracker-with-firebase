import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../store/rootReducer';
import { deleteExpense } from '../../store/features/expenses.slice';
import { useAuthContext } from '../../contexts/authContext';
import { DeleteExepenseButton, ExpenseInfo } from '../../components/Expenses';
import { useExpenseById } from '../../hooks/useExpenseById';
import { PageLoader } from '../../components/Loaders';
import { ProtectedRoute } from '../../components/Routes';
import Head from 'next/head';

const ExpensePage: NextPage = () => {
  const router = useRouter();
  const { expenseId } = router.query;

  const { expense, notFound } = useExpenseById(expenseId as string);
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();

  if (!expense && !notFound) {
    return <PageLoader />;
  }

  if (notFound) {
    router.replace('/');
  }

  const onDelete = async () => {
    await dispatch(deleteExpense({ userId: user!.id, expenseId: expense!.id }));

    router.push('/');
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Expense Info | Expense Tracker</title>
      </Head>
      <section>
        <ExpenseInfo expense={expense!} />
        <DeleteExepenseButton onClick={onDelete} />
      </section>
    </ProtectedRoute>
  );
};

export default ExpensePage;
