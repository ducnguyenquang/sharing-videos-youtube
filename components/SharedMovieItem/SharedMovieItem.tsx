"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import styles from "./SharedMovieItem.module.css";

const SharedMovieItem = ({ item }) => {
  return (
    <div className={styles.shareMovieItem}>
      <iframe
        width="350"
        height="200"
        src={`https://www.youtube.com/embed/${item.id}`}
      />
      <div className={styles.information}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.sharedBy}>Shared by: {item.shared_by}</div>
        <div className={styles.vote}>
          <div className={styles.voteUp}>
            89
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
          </div>
          <div className={styles.voteDown}>
            12
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </span>
          </div>
        </div>
        <div>Description:</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </div>
  );
};

export default SharedMovieItem;
