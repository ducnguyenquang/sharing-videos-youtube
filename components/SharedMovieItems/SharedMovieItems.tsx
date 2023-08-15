import React from "react";
import styles from "./SharedMovieItems.module.css";
import SharedMovieItem from "@/components/SharedMovieItem/SharedMovieItem";

const SharedMovieItems = ({ videos }) => {
  return (
    <div className={styles.sharedMovieItems}>
      {videos?.map((item) => (
        <SharedMovieItem item={item} />
      ))}
    </div>
  );
};

export default SharedMovieItems;
