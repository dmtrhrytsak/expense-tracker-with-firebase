type BudgetRemainingProps = {
  totalBudget: number;
  expenses: number;
};

const BudgetRemaining: React.FC<BudgetRemainingProps> = ({
  totalBudget,
  expenses,
}) => {
  const remainingBudget = Math.round((totalBudget - expenses) * 100) / 100;

  return (
    <article className="budget-info border-t-teal-500">
      <h3 className="text-xl font-semibold">$ {remainingBudget}</h3>
      <p className="text-sm text-zinc-500">Remaining</p>
    </article>
  );
};

export default BudgetRemaining;
