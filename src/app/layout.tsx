import { ReactNode, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <Head>
        <title>Where In World</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>      
        {children}
    </div>
  );
};

export default Layout;