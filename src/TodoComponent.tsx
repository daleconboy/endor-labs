import { useContext, useEffect, useState } from "react";
import styles from "./TodoComponent.module.css";
import classNames from "classnames";
import type { User, Todo } from "../data/types";
import { TagsContext } from "./contexts/TagsContext";
import { TodoList } from "./TodoList/TodoList";
import { Button, InputField, SelectField } from "./FormElements/FormElements";
import { TodoCard } from "./TodoCard/TodoCard";

interface TodoComponentProps {
  userId: string;
}

const USER_QUERY = "/api/users?filter=spec.name==";
const TODOS_QUERY = "/api/todos?filter=spec.user_id==";

/**
 * Applies the singular or plural version of a word based on provided qty
 */
function pluralize(singular: string, plural: string, qty: number): string {
  return qty === 1 ? singular : plural;
}

/**
 * Constructs a heading that reflects the number of todos
 * If null, 0 will be used
 */
function todoHeading (todos: Todo[] | null): string {
  const qty = todos?.length ?? 0;
  return `${qty} ${pluralize("Item", "Items", qty)}`;
}

export const TodoComponent = (
  { userId }: TodoComponentProps
): React.ReactNode => {
  // const [userData, setUserData] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const tags = useContext(TagsContext);

  useEffect(() => {
    // use abort controller for fetch to cancel any pending requests on unmount
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTodos (id: string): Promise<void> {
      console.log("requesting", `${TODOS_QUERY}${id}`);
      const response = await fetch(`${TODOS_QUERY}${id}`, { signal });
      const json = await response.json();
      console.log("json", json);
      setTodos(() => json.list);
    }

    getTodos(userId).catch(e => {});

    return () => {
      controller.abort();
    }
  }, [userId]);

  console.log("user data", todos);
  return (
    <div>
      <h2 className={styles.appHeading}>Todo App</h2>
      <form>
        <fieldset className={classNames(styles.fieldset, styles.inputFields)}>
          <InputField labelText="Add Todo Item" />
          <SelectField labelText="Add Todo Tags" options={tags} />
          <Button>Add</Button>
        </fieldset>
        <div className={styles.grid}>
          <TodoCard title={todoHeading(todos)} className={styles.pending}>
            <TodoList todos={todos} />
          </TodoCard>

          <TodoCard title="1 Completed" className={styles.completed}>
            <ul className={styles.completedList}>
              <li>Pick up Groceries 8/7/2022, 8:03:26y AM (Personal)</li>
            </ul>
          </TodoCard>
        </div>
      </form>
    </div>
  );
}
