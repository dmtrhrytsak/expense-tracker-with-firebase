import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { getBalance, depositBalance } from '../../store/features/balance.slice';
import { selectTotalSpent } from '../../store/features/expenses.slice';
import { useAuthContext } from '../../contexts/authContext';
import parseAmount from '../../utils/parseAmount';
import { BudgetRemaining, BudgetSpent, BudgetTotal } from '.';

const BudgetInfo = () => {
  const { user } = useAuthContext();

  const { balance } = useAppSelector((state) => state.balance);
  const totalSpent = useAppSelector(selectTotalSpent);
  const dispatch = useAppDispatch();

  const handleBudgetUpdate = (newBudget: string) => {
    if (!newBudget) {
      return;
    }

    dispatch(
      depositBalance({ userId: user!.id, newAmount: parseAmount(newBudget) })
    );
  };

  useEffect(() => {
    dispatch(getBalance({ userId: user!.id }));
  }, [dispatch, user]);

  return (
    <section className="mb-8">
      <div className="mb-7">
        <h2 className="text-xl font-semibold">Expense Tracker</h2>
        <p className="text-sm text-zinc-500">{new Date().toDateString()}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <BudgetTotal budgetTotal={balance} onDeposit={handleBudgetUpdate} />
        <BudgetRemaining totalBudget={balance} expenses={totalSpent} />
        <BudgetSpent expenses={totalSpent} />
      </div>
    </section>
  );
};

export default BudgetInfo;
