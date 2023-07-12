import type { Tag } from "../../data/types";
import type { Todo } from "../../data/types";

export type { Todo } from "../../data/types";
export type Todos = Todo[];

const TODOS_ROUTE = "/api/todos";
const USER_TODOS_ROUTE = `${TODOS_ROUTE}?filter=spec.user_id==`;
const TAGS_ROUTE = "/api/tags";

type PutMethod = "POST" | "PATCH";
type GetMethod = "GET";

const HEADERS = {
  "Content-type": "application/json; charset=UTF-8"
} as const;

type Config = {
  method: PutMethod,
  body: string,
  headers: typeof HEADERS;
};

type CreateSpec = Omit<Todo["spec"], "completed_time">;
type UpdateSpec = Partial<Todo["spec"]>;

type ConfigParams = {
    method: "POST";
    spec: CreateSpec;
} | {
    method: "PATCH";
    spec: UpdateSpec;
};

function configObj({ method, spec }: ConfigParams): Config {
  return {
    method,
    body: JSON.stringify({
      spec
    }),
    headers: HEADERS
  };
}

function makeCreateConfig(spec: CreateSpec): Config {
  return configObj({ method: "POST", spec });
}

function makeUpdateConfig(spec: UpdateSpec): Config {
  return configObj({ method: "PATCH", spec });
}

export async function getTags(): Promise<Tag[]> {
  const response = await fetch(TAGS_ROUTE);
  const json = await response.json();
  return json.list;
}

export async function getTodos(user_id: string): Promise<Todos> {
  const response = await fetch(`${USER_TODOS_ROUTE}${user_id}`);
  const json = await response.json();
  return json.list;
}

export async function createTodo(data: CreateSpec): Promise<Todo> {
  const response = await fetch(TODOS_ROUTE, makeCreateConfig(data));
  return await response.json() as Todo;
}

export async function updateTodo(todoId: string, data: UpdateSpec): Promise<Todo> {
  const response = await fetch(`${TODOS_ROUTE}/${todoId}`, makeUpdateConfig(data));
  return await response.json() as Todo;
}
