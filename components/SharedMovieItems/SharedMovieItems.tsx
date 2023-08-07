import React from "react";
import sharedMovieItemsStyles from "./SharedMovieItems.module.css";
import SharedMovieItem from "@/components/SharedMovieItem/SharedMovieItem";

const SharedMovieItems = ({ videos }) => {
  return (
    <div className={sharedMovieItemsStyles.SharedMovieItems}>
      {videos?.map((item) => (
        <SharedMovieItem item={item} />
      ))}
    </div>
  );
};

export default SharedMovieItems;
