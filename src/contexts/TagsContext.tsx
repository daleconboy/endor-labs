import { createContext, useContext, useEffect, useState } from "react";
import { getTags } from "../lib/todoClient";

interface TagsObject {
  id: string;
  value: string;
};

export type TagsData = TagsObject[];

const TagsContext = createContext<TagsData>([]);

export function useTags() {
  return useContext(TagsContext);
}

interface TagsProviderProps {
  children: React.ReactNode;
}

/**
 * Fetches all tags up front and stores in this context
 */
export function TagsProvider({
  children
}: TagsProviderProps): React.ReactElement {
  const [tags, setTags] = useState<TagsData>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchTags (): Promise<void> {
      const tagsData = await getTags();
      if (!ignore && !tags.length) {
        setTags(() => {
          return tagsData.map((tag) => {
            return {
              id: tag.id,
              value: tag.spec.value
            }
          });
        });
      }
    }

    fetchTags().catch(e => {});

    return () => {
      ignore = true;
    }
  });

  return (
    <TagsContext.Provider value={tags}>
      {children}
    </TagsContext.Provider>
  )
}
