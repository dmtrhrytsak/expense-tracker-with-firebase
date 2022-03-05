import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../services/firestore/firestore.config';
import { RootState } from '../rootReducer';
import { Expense, User } from '../../types';

export const getAllExpenses = createAsyncThunk(
  'expenses/getAllExpenses',
  async ({ userId }: { userId: User['id'] }, { dispatch, rejectWithValue }) => {
    try {
      const expensesCollectionRef = collection(db, 'users', userId, 'expenses');

      const expensesQuery = query(
        expensesCollectionRef,
        orderBy('transactionDay', 'desc')
      );
      const expensesSnapshot = await getDocs(expensesQuery);

      const expenses = expensesSnapshot.docs.map((doc) => {
        const docData = doc.data();

        const expense = {
          id: doc.id,
          name: docData.name,
          amount: docData.amount,
          transactionDay: docData.transactionDay.toDate().toLocaleDateString(),
        };

        return expense;
      }) as Expense[];

      dispatch(calculateTotalSpent(expenses));

      return expenses;
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (
    { userId, expense }: { userId: User['id']; expense: Expense },
    { rejectWithValue }
  ) => {
    try {
      const expensesCollectionRef = collection(db, 'users', userId, 'expenses');

      await addDoc(expensesCollectionRef, expense);
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async (
    {
      userId,
      expenseId,
      field,
      newValue,
    }: {
      userId: User['id'];
      expenseId: Expense['id'];
      field: keyof Expense;
      newValue: Expense[keyof Expense];
    },
    { rejectWithValue }
  ) => {
    try {
      const expenseRef = doc(db, 'users', userId, 'expenses', expenseId);

      await updateDoc(expenseRef, {
        [field]: newValue,
      });
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (
    { userId, expenseId }: { userId: User['id']; expenseId: Expense['id'] },
    { rejectWithValue }
  ) => {
    try {
      const expenseRef = doc(db, 'users', userId, 'expenses', expenseId);

      await deleteDoc(expenseRef);
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

type ExpensesState = {
  expenses: Expense[] | null;
  totalSpent: number;
  error: string | null;
};

const initialState: ExpensesState = {
  expenses: null,
  totalSpent: 0,
  error: null,
};

const rejectedReducer = (
  state: ExpensesState,
  action: PayloadAction<{ error: string }>
) => {
  state.error = action.payload.error;
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    calculateTotalSpent: (
      state: ExpensesState,
      { payload }: PayloadAction<Expense[]>
    ) => {
      state.totalSpent = payload.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllExpenses.fulfilled.type,
        (state: ExpensesState, { payload }: PayloadAction<Expense[]>) => {
          state.expenses = payload;
        }
      )
      .addCase(getAllExpenses.rejected.type, rejectedReducer)
      .addCase(editExpense.rejected.type, rejectedReducer)
      .addCase(deleteExpense.rejected.type, rejectedReducer);
  },
});

export const { calculateTotalSpent } = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses;
export const selectTotalSpent = (state: RootState) => state.expenses.totalSpent;

export default expensesSlice.reducer;
