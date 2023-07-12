import { useState } from "react";
import styles from "./TodoComponent.module.css";
import classNames from "classnames";
import type { Todo } from "../../data/types";
import { TagsData } from "../contexts/TagsContext";
import { TodoList } from "../TodoList/TodoList";
import { Button, InputField, SelectField } from "../FormElements/FormElements";
import { TodoCard } from "../TodoCard/TodoCard";
import { useTodosDispatch, } from "../contexts/TodosContext";
import { CompletedTodoList } from "../CompletedTodoList/CompletedTodoList";
import { Todos, createTodo } from "../lib/todoClient";
import { pluralize } from "../lib/formatters";


/**
 * Finds all completed todos
 */
function getCompleted(todos: Todo[]): number {
  return todos.filter(todo => Boolean(todo.spec.completed_time)).length;
}

interface TodoComponentProps {
  userId: string;
  todos: Todos;
  tags: TagsData;
}

/**
 * The main todo component
 */
export function TodoComponent({ userId, todos, tags }: TodoComponentProps ): React.ReactNode {
  const todosDispatch = useTodosDispatch();
  const [todoText, setTodoText] = useState("");
  const [selectedTag, setSelectedTag] = useState(tags[0].id);

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

  const completedQty = getCompleted(todos);
  const pendingQty = todos.length - completedQty;

  return (
    <div>
      <fieldset className={classNames(styles.fieldset, styles.inputFields)}>
        <InputField
          labelText="Add Todo Item"
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
        />
        <SelectField
          labelText="Add Todo Tags"
          options={tags}
          value={selectedTag ?? tags[0]}
          onChange={e => setSelectedTag(e.target.value)}
        />
        <Button disabled={todoText === ""} onClick={handleClick}>
          Add
        </Button>
      </fieldset>

      <div className={styles.grid}>
        <TodoCard
          title={pluralize(pendingQty, "Item", "Items")}
          className={styles.pending
        }>
          <TodoList todos={todos} tags={tags} />
        </TodoCard>

        <TodoCard
          title={`${getCompleted(todos)} Completed`}
          className={styles.completed}
        >
          <CompletedTodoList todos={todos} />
        </TodoCard>
      </div>
    </div>
  );
}
