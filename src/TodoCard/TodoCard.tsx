import React from "react";
import styles from "./TodoCard.module.css";
import classNames from "classnames";

export interface TodoCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function TodoCard({ children, title, className }: TodoCardProps): React.ReactElement {
  return (
    <div className={classNames(styles.itemContainer, className)}>
      <h4 className={styles.itemHeader}>{title}</h4>
      {children}
    </div>
  );
}
