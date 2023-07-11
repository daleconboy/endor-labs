import { TagsData } from "../contexts/TagsContext";
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
  tags: TagsData;
}


/**
 * Finds the tag's value for the given ID
 */
function findTag(id: string, tagIds: TagsData): string | undefined {
 const found = tagIds?.find((tag) => tag.id == id)?.value ?? undefined;
 return found;
}

/**
 * formats the item's string to display tags if they exist
 * e.g. File Taxes (Personal, Pending)
 */
function formatItemText(
  note: string,
  tags: TagsData,
  tagIds?: string[]
): string {

  const tagNames = tagIds?.map(id => findTag(id, tags)).join(", ") ?? "";
  const tagString = tagNames === "" ? "" : ` (${tagNames})`;
  return `${note}${tagString}`;
}

export function TodoList({ todos, tags }: TodoListProps): React.ReactElement {
  return (
    <ul className={styles.list}>
      {todos?.map(({ id, spec }) => {
          const text= formatItemText(spec.note, tags, spec.tag_ids);
          return <TodoItem itemId={id} itemText={text} key={id} />
        }
      )}
    </ul>
  );
}
