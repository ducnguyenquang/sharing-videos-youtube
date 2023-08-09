import React from "react";
import { useCallback, useMemo } from "react";
import { clear, getCurrentUser } from "@/utils/storage";
import { useRouter } from "next/navigation";
import styles from "./Logged.module.css";

const Logged = ({ onLogout, onShareAMovie }) => {
  const router = useRouter();
  const currentUser = useMemo(() => getCurrentUser() || "", []);

  const onLogoutClick = useCallback(() => {
    clear();
    onLogout();
    router.refresh();
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
