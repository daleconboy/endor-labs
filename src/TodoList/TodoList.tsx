import { TagsData } from "../contexts/TagsContext";
import type { Todo } from "./../../data/types";
import styles from "./TodoList.module.css"
import { updateTodo } from "../lib/todoClient";
import { useTodosDispatch, } from "../contexts/TodosContext";
import type { Action } from "../contexts/TodosContext";
import { formatTagString, extractTags } from "../lib/formatters";

/**
 * Curried function to capture the dispatcher since it's only
 * available inside the component. This prevents us from having
 * to create a new fucntion on every iteration of the list items
 */
const handleOnChangeWith =
  (dispatch: React.Dispatch<Action>):
    React.ChangeEventHandler<HTMLInputElement> =>
    async (e): Promise<void> => {
      const IsoNow = new Date().toISOString();

      //
      if (e.target.checked === true) {
        const todo = await updateTodo(e.target.id, {
          completed_time: IsoNow,
        });
        dispatch({ type: "UPDATE", data: todo });
      }

      if (e.target.checked === false) {
        const todo = await updateTodo(e.target.id, {
          completed_time: "",
        });
        dispatch({ type: "UPDATE", data: todo });
      }
    };


/**
 * Formats the todo text for the labels
 */
function formatItemText(text: string, tags: TagsData, tagIds: string[]): string {
  return [text, formatTagString(extractTags(tagIds, tags))].join(" ");
}


interface TodoListProps {
  todos: Todo[] | null;
  tags: TagsData;
}

/**
 * The TodoList component
 * Creates the list of checkboxed todo items
 */
export function TodoList({ todos, tags }: TodoListProps): React.ReactElement {
  const todosDispatch = useTodosDispatch();
  const handleOnChange = handleOnChangeWith(todosDispatch!);

  return (
    <ul className={styles.list}>
      {todos?.map(({ id, spec }) => {
          const text= formatItemText(spec.note, tags, spec.tag_ids ?? []);
          return (
            <li className={styles.item} key={id}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={id}
                onChange={handleOnChange}
              ></input>
              <label className={styles.label} htmlFor={id}>{text}</label>
            </li>
          )
        }
      )}
    </ul>
  );
}
