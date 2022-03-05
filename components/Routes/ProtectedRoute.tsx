import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext } from '../../contexts/authContext';
import { PageLoader, RedirectLoader } from '../Loaders';

const ProtectedRoute: React.FC = ({ children }) => {
  const { user, isInitializing } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !user) {
      router.push('/auth');
    }
  }, [router, isInitializing, user]);

  if (isInitializing) {
    return <PageLoader />;
  }

  if (!user) {
    return <RedirectLoader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
