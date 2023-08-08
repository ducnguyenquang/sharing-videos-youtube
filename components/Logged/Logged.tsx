import React from "react";
import { useCallback, useMemo } from "react";
import { clear, getCurrentUser } from "@/utils/storage";
import { useRouter } from "next/dist/client/router";
import styles from "./Logged.module.css";

const Logged = ({ onLogout }) => {
  const router = useRouter();
  const currentUser = useMemo(() => getCurrentUser() || "", []);

  const onShareAMovie = () => {
    router.push("/share");
  };

  const onLogoutClick = useCallback(() => {
    clear();
    // router.push("/");
    onLogout();
    router.reload();
  }, []);

  return (
    <div className={styles.loggedForm}>
      <div>Welcome {currentUser}</div>
      <button type="button" className={styles.button} onClick={onShareAMovie}>
        Share a movie
      </button>
      <button type="button" className={styles.button} onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Logged;
