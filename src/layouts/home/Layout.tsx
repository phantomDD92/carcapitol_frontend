import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header menuItems={["Buy", "Sell", "Finance"]} position="sticky" />
      {children}
    </>
  );
};

export default HomeLayout;
