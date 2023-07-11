import type { Todo } from "./../../data/types";
import styles from "./TodoList.module.css"

interface TodoItemProps {
  itemId: string;
  itemText: string;
}

function TodoItem (
  { itemId, itemText }: TodoItemProps
): React.ReactElement {

  return (
    <li className={styles.item}>
      <input className={styles.checkbox} type="checkbox" id={itemId}></input>
      <label className={styles.label} htmlFor={itemId}>{itemText}</label>
    </li>
  )
};

interface TodoListProps {
  todos: Todo[] | null;
}

export function TodoList({ todos }: TodoListProps): React.ReactElement {
  return (
    <ul className={styles.list}>
      {todos?.map(({ id, spec }) => (
        <TodoItem itemId={id} itemText={spec.note} key={id} />
      ))}
    </ul>
  );
}
