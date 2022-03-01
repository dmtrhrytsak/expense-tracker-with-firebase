import Link from 'next/link';

import { Expense } from '../../types';

type ExpensesTableProps = {
  expenses: Expense[];
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      <table className="w-full border-collapse divide-y">
        <thead>
          <tr>
            <th className="px-6 py-1 bg-gray-50 text-sm text-zinc-500 text-left font-medium">
              Expenses
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="p-6">
                <Link href={`/expense/${expense.id}`}>
                  <a className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{expense.name}</p>
                      <p className="text-sm text-zinc-500">
                        {expense.transactionDay}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${expense.amount.toFixed(2)}
                    </p>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
