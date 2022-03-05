import Head from 'next/head';

import { Container, Navbar } from '.';
import { useAuthContext } from '../../contexts/authContext';
import { LogoutButton } from '../Buttons';

const Layout: React.FC = ({ children }) => {
  const { user, signOutFromAccount } = useAuthContext();

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Your expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        isAuth={!!user}
        logoutButton={<LogoutButton onClick={signOutFromAccount} />}
      />
      <main className="min-h-screen py-8 bg-gray-100">
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
