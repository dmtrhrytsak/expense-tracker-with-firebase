import { IoMdAddCircleOutline } from 'react-icons/io';

import useAmountInput from '../../hooks/useAmountInput';
import useEditMode from '../../hooks/useEditMode';

type BudgetTotalProps = {
  budgetTotal: number;
  onDeposit: (newBudget: string) => void;
};

const BudgetTotal: React.FC<BudgetTotalProps> = ({
  budgetTotal,
  onDeposit,
}) => {
  const { editMode, toggleEditMode } = useEditMode();
  const { amount, handleAmountChange } = useAmountInput(String(budgetTotal));

  const handleSave = () => {
    onDeposit(amount);
    toggleEditMode();
  };

  return (
    <article className="budget-info border-t-sky-500">
      <div className="flex gap-1 items-center">
        {editMode ? (
          <input
            value={amount}
            onChange={handleAmountChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
            className="w-14 pl-1 rounded-sm text-xl font-semibold outline outline-1 outline-black"
          />
        ) : (
          <h3 className="text-xl font-semibold">$ {amount}</h3>
        )}

        <button
          title="Deposit"
          onClick={() => {
            editMode ? handleSave() : toggleEditMode();
          }}
        >
          <IoMdAddCircleOutline className="text-lg hover:text-emerald-500 active:text-emerald-500" />
        </button>
      </div>

      <p className="text-sm text-zinc-500">Budget</p>
    </article>
  );
};

export default BudgetTotal;
