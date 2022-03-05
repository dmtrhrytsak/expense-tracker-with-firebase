import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../services/firestore/firestore.config';
import { User } from '../../types';
import { RootState } from '../rootReducer';

export const getBalance = createAsyncThunk(
  'balance/getBalance',
  async ({ userId }: { userId: User['id'] }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);

      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        rejectWithValue('User does not exist.');
      }

      const { balance } = userSnapshot.data()!;

      return balance as number;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const depositBalance = createAsyncThunk(
  'balance/depositBalance',
  async (
    { userId, newAmount }: { userId: User['id']; newAmount: number },
    { rejectWithValue }
  ) => {
    try {
      const userRef = doc(db, 'users', userId);

      await updateDoc(userRef, { balance: newAmount });

      return newAmount;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

type BalanceState = {
  balance: number;
};

const initialState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getBalance.fulfilled.type,
        (
          state: BalanceState,
          { payload }: PayloadAction<BalanceState['balance']>
        ) => {
          state.balance = payload;
        }
      )
      .addCase(
        depositBalance.fulfilled.type,
        (
          state: BalanceState,
          { payload }: PayloadAction<BalanceState['balance']>
        ) => {
          state.balance = payload;
        }
      );
  },
});

export default balanceSlice.reducer;
