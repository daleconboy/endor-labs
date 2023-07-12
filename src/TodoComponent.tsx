import { useContext, useState, useEffect } from "react";
import styles from "./TodoComponent.module.css";
import classNames from "classnames";
import type { Todo } from "../data/types";
import { useTags } from "./contexts/TagsContext";
import { TodoList } from "./TodoList/TodoList";
import { Button, InputField, SelectField } from "./FormElements/FormElements";
import { TodoCard } from "./TodoCard/TodoCard";
import { useTodos, useTodosDispatch, } from "./contexts/TodosContext";
import { CompletedTodoList } from "./CompletedTodoList/CompletedTodoList";
import { createTodo } from "./lib/todoClient";

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

function getCompleted(todos: Todo[]): number {
  return todos.filter(todo => Boolean(todo.spec.completed_time)).length;
}

function completedHeading(todos: Todo[]): string {
  return `${getCompleted(todos)} Completed`;
}

interface TodoComponentProps {
  userId: string;
}

export function TodoComponent({ userId }: TodoComponentProps ): React.ReactNode {
  const todos = useTodos();
  const todosDispatch = useTodosDispatch();
  const tags = useTags();
  const [todoText, setTodoText] = useState("");
  const [selectedTag, setSelectedTag] = useState(tags[0]?.id);

  /**
   * Click handler for button.
   * Hanldes new todo creation.
   */
  async function handleClick(): Promise<void> {
    setTodoText("");
    const todo = await createTodo({
      note: todoText,
      user_id: userId,
      tag_ids: [selectedTag]
    });
    todosDispatch!({ type: "CREATE", data: todo });
  }

  return (
    <>
      {!tags.length && !todos.length
        ? <p>Loading...</p>
        : <div>
            <fieldset className={classNames(styles.fieldset, styles.inputFields)}>
              <InputField
                labelText="Add Todo Item"
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
              />
              <SelectField
                labelText="Add Todo Tags"
                options={tags}
                onChange={e => setSelectedTag(e.target.value)}
              />
              <Button disabled={todoText === ""} onClick={handleClick} >
                Add
              </Button>
            </fieldset>

            <div className={styles.grid}>
              <TodoCard title={todoHeading(todos)} className={styles.pending}>
                <TodoList todos={todos} tags={tags} />
              </TodoCard>

              <TodoCard title={completedHeading(todos)} className={styles.completed}>
                <CompletedTodoList todos={todos} />
              </TodoCard>
            </div>
          </div>
      }
    </>
  );
}
