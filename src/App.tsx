import { TodoComponent } from "./TodoComponent";
import { createContext, useEffect, useState } from "react";
import { TagsContext } from "./contexts/TagsContext";
import type { Tag } from "../data/types";
import type { TagsData } from "./contexts/TagsContext";

// Robert Huffman
const TODO_USER_ID = "468877";

interface TagResponse {
  list: Tag[];
}

export const App = () => {
  const [tags, setTags] = useState<TagsData>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTags (): Promise<void> {
      const response = await fetch("/api/tags", { signal });
      const json = await response.json() as TagResponse;
      // console.log("TAGS RESPONSE", json);
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

  return (
    <div
      style={{ border: "1px dashed #ccc", padding: "16px" }}
    >
      <TagsContext.Provider value={tags}>
        <TodoComponent userId={TODO_USER_ID} />
      </TagsContext.Provider>
    </div>
  );
}
