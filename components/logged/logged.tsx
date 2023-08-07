"use client";
import { clear, getCurrentUser } from "@/utils/storage";
import { useRouter } from "next/dist/client/router";
import { useCallback, useMemo } from "react";
import loggedStyles from "./logged.module.css";

const Logged = ({ onLogout }) => {
  const router = useRouter();
  const currentUser = useMemo(() => getCurrentUser() as string, []);

  const onShareAMovie = () => {
    router.push("/share");
  };

  const onLogoutClick = useCallback(() => {
    clear();
    router.push("/");
    onLogout();
  }, []);

  return (
    <div className={loggedStyles.logged}>
      <div>Welcome {currentUser}</div>
      <button type="button" onClick={onShareAMovie}>
        Share a movie
      </button>
      <button type="button" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Logged;
