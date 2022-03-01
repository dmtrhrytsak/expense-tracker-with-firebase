type BudgetTotalProps = {
  amount: number;
};

const BudgetTotal: React.FC<BudgetTotalProps> = ({ amount }) => {
  return (
    <article className="budget-info border-t-sky-500">
      <h3 className="text-xl font-semibold">$ {amount}</h3>
      <p className="text-sm text-zinc-500">Budget</p>
    </article>
  );
};

export default BudgetTotal;
