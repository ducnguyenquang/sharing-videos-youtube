import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '@/context/authContext';
import LoginComponent from "@/components/Login/Login";
import layoutStyles from "./Layout.module.css";

const Layout = ({ children }) => {
  const { login, logout } = useAuth();

  return (
    <div className={layoutStyles.template}>
      <header className={layoutStyles.headerTemplate}>
        <div className={layoutStyles.titleTemplate}>
          <FontAwesomeIcon icon={faHome} />
          Funny Movies
        </div>
        <LoginComponent onLogin={login} onLogout={logout} />

      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;