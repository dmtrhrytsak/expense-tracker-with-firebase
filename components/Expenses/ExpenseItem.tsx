import { useState } from 'react';
import useEditMode from '../../hooks/useEditMode';

import { Expense } from '../../types';

type ExpenseItemProps = {
  title: string;
  value: Expense[keyof Expense];
  isEditable?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (newValue: string) => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  title,
  value,
  isEditable,
  handleChange,
  onSave,
}) => {
  const { editMode, toggleEditMode } = useEditMode();

  const handleSave = () => {
    onSave(value as string);
    toggleEditMode();
  };

  return (
    <div className="flex items-center justify-between p-3 mb-4 border border-gray-200 rounded bg-white">
      <div className="flex flex-col">
        <span className="font-semibold text-zinc-500">{title}</span>
        {editMode ? (
          <input
            value={value as Expense[keyof Omit<Expense, 'transactionDay'>]}
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
            className="w-4/5 outline-none border-b border-gray-300 py-1 md:py-2"
          />
        ) : (
          <p className="border-b border-transparent py-1 md:py-2">{value}</p>
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
