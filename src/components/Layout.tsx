
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('fr');

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
