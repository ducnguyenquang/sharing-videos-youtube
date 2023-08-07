"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import sharedMovieItemStyles from "./sharedMovieItem.module.css";

const SharedMovieItem = ({ item }) => {
  return (
    <div className={sharedMovieItemStyles.shareMovieItem}>
      <iframe
        width="350"
        height="200"
        src={`https://www.youtube.com/embed/${item.id}`}
        // frameborder="0"
        // allowfullscreen
      />
      <div className={sharedMovieItemStyles.information}>
        <div className={sharedMovieItemStyles.title}>{item.title}</div>
        <div className={sharedMovieItemStyles.sharedBy}>
          Shared by: {item.shared_by}
        </div>
        <div className={sharedMovieItemStyles.vote}>
          <div className={sharedMovieItemStyles.voteUp}>
            89
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div className={sharedMovieItemStyles.voteDown}>
            12
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        </div>
        <div>Description:</div>
        <div className={sharedMovieItemStyles.description}>
          {item.description}
        </div>
      </div>
    </div>
  );
};

export default SharedMovieItem;
