import Router from 'next/router';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from './firestore.config';
import { Expense } from '../../types';

export const saveUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { balance: 0 }, { merge: true });
};

export const getExpenseById = async (userId: string, expenseId: string) => {
  try {
    const expenseSnapshot = await getDoc(
      doc(db, 'users', userId, 'expenses', expenseId)
    );

    if (!expenseSnapshot.exists()) {
      return null;
    }

    const expenseData = expenseSnapshot.data();

    const expense = {
      id: expenseSnapshot.id,
      ...expenseData,
      transactionDay: expenseData.transactionDay.toDate().toLocaleDateString(),
    } as Expense;

    return expense;
  } catch (error) {
    return null;
  }
};
