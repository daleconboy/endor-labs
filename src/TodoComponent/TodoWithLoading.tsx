import { useTags } from "../contexts/TagsContext";
import { useTodos } from "../contexts/TodosContext";
import { TodoComponent } from "./TodoComponent";

interface TodoWithLoadingProps {
  userId: string;
}

/**
 * The main todo component
 */
export function TodoWithLoading({ userId }: TodoWithLoadingProps): React.ReactNode {
  const todos = useTodos();
  const tags = useTags();

  return (
    <>
      {!tags.length && !todos.length
        ? <p>Loading...</p>
        : <TodoComponent userId={userId} todos={todos} tags={tags} />
      }
    </>
  );
}
