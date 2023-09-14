import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse( localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case "ERROR_DEFAULT":
      return {
        ...state,
        error: null,
      };
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(payload))
      return {
        user: payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: payload,
      };
    case "LOGOUT_USER":
      localStorage.removeItem("user")
      localStorage.setItem("user", null)
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    AuthReducer,
    INITIAL_STATE
  );

  useEffect( () => {
    localStorage.setItem("user", JSON.stringify(state.user))
}, [state.user])

  const { user, loading, error } = state;

  const defaultErrorHandler = () => {
    dispatch({ type: "ERROR_DEFAULT" });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, dispatch, defaultErrorHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
