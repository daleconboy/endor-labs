import { Tag, Todo, User } from "./types";

/**
 * Simple utility to generate a unique identifier
 */
export const generateID = () => {
  return [
    Date.now().toString(16).slice(2, 8),
    Math.random().toString(16).slice(2, 8)
  ].join(".");
};

/**
 * Naive utility to get a deep property
 */
export const getProperty = (
  target: object,
  selector: string[]
): unknown | undefined => {
  let cursor: any = target;
  for (let i = 0; i < selector.length; i++) {
    let next = selector[i];
    if (cursor && "object" === typeof cursor && next in cursor) {
      cursor = cursor[next];
    } else {
      cursor = undefined;
      break;
    }
  }

  return cursor;
};

export const buildTag = (createTime: string, value: string): Tag => ({
  id: generateID(),
  meta: {
    create_time: createTime
  },
  spec: {
    value
  }
});

export const buildTodo = (
  createTime: string,
  note: string,
  user: User,
  tags?: Tag[],
  completedTime?: string
): Todo => ({
  id: generateID(),
  meta: {
    create_time: createTime
  },
  spec: {
    note,
    user_id: user.id,
    // extract IDs from given tags
    tag_ids: tags?.map((t) => t.id),
    completed_time: completedTime
  }
});
