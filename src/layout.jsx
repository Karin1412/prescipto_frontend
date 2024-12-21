import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const Layout = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!noHeaderFooter && <Header />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!noHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
