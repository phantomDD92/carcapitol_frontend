import React, { useCallback, useEffect } from 'react';
import CCHeader from '@/layouts/main/Header';
import CCFooter from '@/layouts/main/Footer';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/auth/UserContext';

type Props = {
  children?: React.ReactNode;
};

const CCMainLayout = ({ children }: Props) => {
  const router = useRouter();
  const { data } = useUser();

  const checkAuth = useCallback(() => {
    // if (!data.accessToken) {
    //   return router.push('/auth/sign-in');
    // } else {
    // return router.push('/dashboard');
    // }
  }, [data]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <CCHeader />
      <div className="mx-auto">{children}</div>
      <CCFooter />
    </>
  );
};

export default CCMainLayout;
