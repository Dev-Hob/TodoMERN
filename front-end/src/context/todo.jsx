import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  todos: [],
  todo: {},
};

export const TodoContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case 'DELETE_TODO': 
    const newTodo = state.todos.filter( ({_id}) => _id !== payload);
    return { 
      ...state,
      todos: newTodo
    }
    case "SET_TODOS":
      return {
        ...state,
        todos: payload,
      };
    case "SET_TODO":
      return { ...state, todo: payload };
    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, todo: state.todo, dispatch }}
    >
      {children}
    </TodoContext.Provider>
  );
};
