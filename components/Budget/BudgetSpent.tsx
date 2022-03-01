type BudgetSpentProps = {
  expenses: number;
};

const BudgetSpent: React.FC<BudgetSpentProps> = ({ expenses }) => {
  return (
    <article className="budget-info border-t-violet-500">
      <h3 className="text-xl font-semibold">$ {expenses}</h3>
      <p className="text-sm text-zinc-500">Total Spent</p>
    </article>
  );
};

export default BudgetSpent;
