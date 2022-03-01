import { useState } from 'react';

import { validateExpenseAmount } from './AddExpenseForm';
import { Expense } from '../../types';

type ExpenseItemProps = {
  title: string;
  value: Expense[keyof Expense];
  tag: keyof Expense;
  isEditable?: boolean;
  onSave: (field: keyof Expense, newValue: Expense[keyof Expense]) => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  title,
  value,
  tag,
  isEditable,
  onSave,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    onSave(tag, tempValue);
    toggleEditMode();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (tag === 'amount' && !validateExpenseAmount(value)) {
      return;
    }

    setTempValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-3 mb-4 border border-gray-200 rounded bg-white">
      <div className="flex flex-col">
        <span className="font-semibold text-zinc-500">{title}</span>
        {editMode ? (
          <input
            value={tempValue as Expense[keyof Omit<Expense, 'transactionDay'>]}
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
            className="w-4/5 outline-none border-b border-gray-300 py-1 md:py-2"
          />
        ) : (
          <p className="border-b border-transparent py-1 md:py-2">
            {typeof tempValue === 'number'
              ? `$${tempValue.toFixed(2)}`
              : `${tempValue}`}
          </p>
        )}
      </div>

      {isEditable &&
        (editMode ? (
          <button
            type="button"
            onClick={handleSave}
            className="flex w-16 py-2 items-center justify-center border-2 border-transparent rounded bg-cyan-500 text-white hover:border-cyan-600 active:bg-cyan-400"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleEditMode}
            className="flex w-16 py-2 items-center justify-center border-2 border-transparent rounded bg-blue-500 text-white hover:border-blue-600 active:bg-blue-600"
          >
            Edit
          </button>
        ))}
    </div>
  );
};

export default ExpenseItem;
