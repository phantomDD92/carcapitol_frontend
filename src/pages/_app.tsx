// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import React from 'react';
import { UserProvider } from '@/contexts/auth/UserContext';
import { Toaster } from '@/components/ui/toaster';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: MyAppProps) {
  // Use the getLayout function if it exists; otherwise, return the page as is
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <UserProvider>
        {/* Call getLayout with the component wrapped inside it */}
        {getLayout(<Component {...pageProps} />)}
      </UserProvider>
      <Toaster />
    </>
  );
}
