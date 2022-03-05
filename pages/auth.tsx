import Head from 'next/head';

import { AuthRoute } from '../components/Routes';
import { AuthForm } from '../components/Auth';
import { useAuthContext } from '../contexts/authContext';

const AuthPage = () => {
  const { signInWithCredentials, signUpWithEmailAndPassword } =
    useAuthContext();

  return (
    <AuthRoute>
      <Head>
        <title>Auth | Expense Tracker</title>
      </Head>

      <section className="flex justify-center">
        <AuthForm
          onSignIn={signInWithCredentials}
          onSignUp={signUpWithEmailAndPassword}
        />
      </section>
    </AuthRoute>
  );
};

export default AuthPage;
