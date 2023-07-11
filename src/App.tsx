import { TodoComponent } from "./TodoComponent";
import { useEffect, useState } from "react";
import { TagsContext } from "./contexts/TagsContext";
import { TodosProvider } from "./contexts/TodosContext";
import type { Tag, Todo } from "../data/types";
import type { TagsData } from "./contexts/TagsContext";

// Robert Huffman
const TODO_USER_ID = "468877";
const TODOS_QUERY = "/api/todos?filter=spec.user_id==";

interface TagResponse {
  list: Tag[];
}

export const App = () => {
  const [tags, setTags] = useState<TagsData>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTags (): Promise<void> {
      const response = await fetch("/api/tags", { signal });
      const json = await response.json() as TagResponse;
      setTags(() => {
        return json.list?.map((tag) => {
          return {
            id: tag.id,
            value: tag.spec.value
          }
        });
      });
    }

    getTags().catch(e => {});

    return () => {
      controller.abort();
    }
  }, []);

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

    getTodos(TODO_USER_ID).catch(e => {});

    // fetch("/api/todos?filter=spec.user_id==371538")
    // fetch("/api/users/371538")
    //   .then(async (response) => {
    //     const json = await response.json();
    //     console.log("RESPONSE", json);
    //   });

    return () => {
      controller.abort();
    }
  }, [TODO_USER_ID]);

  return (
    <div
      style={{ border: "1px dashed #ccc", padding: "16px" }}
    >
      <TodosProvider value={todos}>
        <TagsContext.Provider value={tags}>
          {todos.length && tags.length
            ? <TodoComponent />
            : <p>Loading...</p>
          }
        </TagsContext.Provider>
      </TodosProvider>
    </div>
  );
}
