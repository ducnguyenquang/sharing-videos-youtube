import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import LoginComponent from "@/components/Login/Login";
import styles from "./Layout.module.css";
import Link from "next/link";

const Layout = ({ children }) => {
  const { login, logout } = useAuth();

  return (
    <div className={styles.template}>
      <header className={styles.headerTemplate}>
        <Link href={"/"} className={styles.link}>
          <div className={styles.titleTemplate}>
            <FontAwesomeIcon icon={faHome} />
            Funny Movies
          </div>
        </Link>
        <LoginComponent onLogin={login} onLogout={logout} />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
