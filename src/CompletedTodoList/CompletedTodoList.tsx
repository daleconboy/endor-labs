import React from "react";
import styles from "./CompletedTodoList.module.css";
import type { Todo, Todos } from "../lib/todoClient";
import { formatTagString, extractTags, humanDateTimeString } from "../lib/formatters";
import type { TagsData } from "../contexts/TagsContext";
import { useTags } from "../contexts/TagsContext";

interface CompletedTodoListProps {
 todos: Todos;
}

function getCompleted(todos: Todos): Todos {
  return todos.filter(todo => Boolean(todo.spec.completed_time));
}

/**
 * Formats the todo text for the list items
 */
function formatItemText(todo: Todo, tags: TagsData): string {
  return [
    todo.spec.note,
    humanDateTimeString(todo.spec.completed_time!),
    formatTagString(extractTags(todo.spec.tag_ids ?? [], tags))
  ].join(" ");
}

export function CompletedTodoList({
  todos
 }: CompletedTodoListProps): React.ReactElement {
  const tags = useTags();

  const completed = getCompleted(todos);
  return (
    <>
      {completed.length > 0 &&
        <ul className={styles.list}>
          {completed.map(todo => {
            return <li key={todo.id}>{formatItemText(todo, tags)}</li>
          })}
        </ul>
      }
    </>
);
}
