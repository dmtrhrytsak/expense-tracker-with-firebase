import useAmountInput from '../../hooks/useAmountInput';
import useNameInput from '../../hooks/useNameInput';
import parseAmount from '../../utils/parseAmount';
import { editExpense } from '../../store/features/expenses.slice';
import { useAppDispatch } from '../../store/rootReducer';
import { useAuthContext } from '../../contexts/authContext';
import { ExpenseItem } from '.';
import { Expense } from '../../types';

type ExpenseInfoProps = { expense: Expense };

const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ expense }) => {
  const { name, handleNameChange } = useNameInput(expense.name);
  const { amount, handleAmountChange } = useAmountInput(String(expense.amount));

  const { user } = useAuthContext();

  const dispatch = useAppDispatch();

  const handleNameUpdate = (newValue: string) => {
    if (!newValue.trim()) {
      return;
    }

    dispatch(
      editExpense({
        userId: user!.id,
        expenseId: expense.id,
        field: 'name',
        newValue: newValue.trim(),
      })
    );
  };

  const handleAmountUpdate = (newValue: string) => {
    if (!newValue) {
      return;
    }

    dispatch(
      editExpense({
        userId: user!.id,
        expenseId: expense.id,
        field: 'amount',
        newValue: parseAmount(newValue),
      })
    );
  };

  return (
    <>
      <ExpenseItem
        title="Name"
        value={name}
        onSave={handleNameUpdate}
        handleChange={handleNameChange}
        isEditable
      />
      <ExpenseItem
        title="Amount"
        value={amount}
        handleChange={handleAmountChange}
        onSave={handleAmountUpdate}
        isEditable
      />
      <ExpenseItem
        title="Date"
        value={expense.transactionDay}
        handleChange={handleAmountChange}
        onSave={() => {}}
      />
    </>
  );
};

export default ExpenseInfo;
