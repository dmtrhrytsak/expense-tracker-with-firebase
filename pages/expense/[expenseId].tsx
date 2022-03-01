import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../services/firestore/firestore.config';
import { useAppDispatch } from '../../store/rootReducer';
import {
  deleteExpense,
  editExpense,
} from '../../store/features/expenses.slice';
import { DeleteExepenseButton, ExpenseItem } from '../../components/Expenses';
import { Expense } from '../../types';

type ExpenseProps = {
  expense: Expense;
};

const ExpensePage: NextPage<ExpenseProps> = ({ expense }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSave = (field: keyof Expense, newValue: Expense[keyof Expense]) => {
    dispatch(editExpense({ expenseId: expense.id, field, newValue }));
  };

  const onDelete = async () => {
    await dispatch(deleteExpense(expense.id));

    router.push('/');
  };

  return (
    <section>
      <ExpenseItem
        title="Name"
        value={expense.name}
        tag="name"
        onSave={onSave}
        isEditable
      />
      <ExpenseItem
        title="Amount"
        value={expense.amount}
        tag="amount"
        onSave={onSave}
      />
      <ExpenseItem
        title="Date"
        value={expense.transactionDay}
        onSave={onSave}
        tag="transactionDay"
      />

      <DeleteExepenseButton onClick={onDelete} />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<ExpenseProps> = async (
  context
) => {
  const { expenseId } = context.params!;

  const expenseSnapshot = await getDoc(
    doc(db, 'expenses', expenseId as string)
  );

  if (!expenseSnapshot.exists()) {
    return {
      notFound: true,
    };
  }

  const expenseData = expenseSnapshot.data();

  const expense = {
    id: expenseSnapshot.id,
    ...expenseData,
    transactionDay: expenseData.transactionDay.toDate().toLocaleDateString(),
  } as Expense;

  return {
    props: {
      expense,
    },
  };
};

export default ExpensePage;
