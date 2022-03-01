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
import { Expense } from '../../types';

const expensesCollectionRef = collection(db, 'expenses');

export const getAllExpenses = createAsyncThunk(
  'expenses/getAllExpenses',
  async (_, { rejectWithValue }) => {
    try {
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
      });

      return expenses;
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense: Expense, { rejectWithValue }) => {
    try {
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
      expenseId,
      field,
      newValue,
    }: {
      expenseId: Expense['id'];
      field: keyof Expense;
      newValue: Expense[keyof Expense];
    },
    { rejectWithValue }
  ) => {
    try {
      const expenseRef = doc(db, 'expenses', expenseId);

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
  async (expenseId: Expense['id'], { rejectWithValue }) => {
    try {
      const expenseRef = doc(db, 'expenses', expenseId);

      await deleteDoc(expenseRef);
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

type ExpensesState = {
  expenses: Expense[] | null;
  error: string | null;
};

const initialState: ExpensesState = {
  expenses: null,
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
  reducers: {},
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

export const selectExpenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
