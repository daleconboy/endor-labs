import React from "react";
import { createContext, useContext, useReducer } from "react";
import type { Todo } from "../../data/types";

const TodosContext = createContext<Todo[]>([]);
const TodosDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export type Todos = Todo[];
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
  value?: Todos;
}

export function TodosProvider({ children, value = [] }: TodosProviderProps) {
  const [, dispatch] = useReducer(todosReducer, value);

  return (
    <TodosContext.Provider value={value}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  )
}
