import { createContext } from "react";

interface TagsObject {
  id: string;
  value: string;
};

export type TagsData = TagsObject[];

export const TagsContext = createContext<TagsData>([]);
