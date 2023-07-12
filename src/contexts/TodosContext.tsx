import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import type { Todo, Todos } from "../lib/todoClient";

const TodosContext = createContext<Todo[]>([]);
const TodosDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export type ActionType = "CREATE" | "UPDATE";

export const UPDATE_ACTION: ActionType = "UPDATE";
export const CREATE_ACTION: ActionType = "CREATE";

export interface Action {
  type: ActionType;
  data: Todo;
}

type TodosReducer = React.Reducer<Todos, Action>;

function create(todos: Todos, newTodo: Todo): Todos {
  return [...todos, newTodo];
}

function update(todos: Todos, updatedTodo: Todo): Todos {
  return todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo);
}

const todosReducer: TodosReducer = (todos, action) => {
  if (action.type === UPDATE_ACTION) {
    return update(todos, action.data);
  }

  if (action.type === CREATE_ACTION) {
    return create(todos, action.data);
  }

  return todos;
};

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

interface TodosProviderProps {
  children: React.ReactNode;
  USER_ID: string;
}

const TODOS_QUERY = "/api/todos?filter=spec.user_id==";

export function TodosProvider({
  children,
  USER_ID
}: TodosProviderProps): React.ReactElement {
  const [todos, dispatch] = useReducer(todosReducer, []);

  useEffect(() => {
    let ignore = false;

    async function getTodos(id: string): Promise<void> {
      console.log("requesting", `${TODOS_QUERY}${id}`);
      const response = await fetch(`${TODOS_QUERY}${id}`);
      const json = await response.json();

      if (!ignore && !todos.length) {
        json.list.forEach((todo: Todo) => dispatch({ type: "CREATE", data: todo}))
      }
    }

    getTodos(USER_ID).catch(e => {});

    return () => {
      ignore = true;
    }
  }, [USER_ID]);


  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  )
}
