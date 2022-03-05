import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { ExpensesTable } from '.';
import { getAllExpenses } from '../../store/features/expenses.slice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../store/rootReducer';
import { db } from '../../services/firestore/firestore.config';
import { useAuthContext } from '../../contexts/authContext';

const Expenses = () => {
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector((state: RootState) => state.expenses);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'expenses'), () => {
      dispatch(getAllExpenses({ userId: user!.id }));
    });

    return unsubscribe;
  }, [dispatch, user]);

  if (!expenses) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <ExpensesTable expenses={expenses} />
    </section>
  );
};

export default Expenses;
