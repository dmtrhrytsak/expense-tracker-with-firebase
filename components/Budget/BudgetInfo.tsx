import { BudgetRemaining, BudgetSpent, BudgetTotal } from '.';

const BudgetInfo = () => {
  const totalBudget = 138.3;
  const expenses = 50.2;

  return (
    <section className="mb-8">
      <div className="mb-7">
        <h2 className="text-xl font-semibold">Expense Tracker</h2>
        <p className="text-sm text-zinc-500">{new Date().toDateString()}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <BudgetTotal amount={totalBudget} />
        <BudgetRemaining totalBudget={totalBudget} expenses={expenses} />
        <BudgetSpent expenses={expenses} />
      </div>
    </section>
  );
};

export default BudgetInfo;
