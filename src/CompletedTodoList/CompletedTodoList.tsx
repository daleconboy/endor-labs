import React from "react";
import styles from "./CompletedTodoList.module.css";
import type { Todos } from "../lib/todoClient";

interface CompletedTodoListProps {
 todos: Todos;
}

function getCompleted(todos: Todos): Todos {
  return todos.filter(todo => Boolean(todo.spec.completed_time));
}

export function CompletedTodoList({
  todos
 }: CompletedTodoListProps): React.ReactElement {
  const completed = getCompleted(todos);
  return (
    <>
      {completed.length > 0 &&
        <ul className={styles.list}>
          {completed.map(todo => <li key={todo.id}>{todo.spec.note}</li>)}
        </ul>
      }
    </>
);
}
