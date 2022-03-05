import type { NextPage } from 'next';
import Head from 'next/head';

import { ProtectedRoute } from '../components/Routes';
import { BudgetInfo } from '../components/Budget';
import { Expenses } from '../components/Expenses';
import { AddButton } from '../components/Buttons';

const Home: NextPage = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard | Expense Tracker</title>
      </Head>

      <section>
        <BudgetInfo />
        <Expenses />
        <AddButton />
      </section>
    </ProtectedRoute>
  );
};

export default Home;
