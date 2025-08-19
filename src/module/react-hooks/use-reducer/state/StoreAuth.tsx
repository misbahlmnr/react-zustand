import { createContext, ReactNode, useEffect, useReducer } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  image: string;
  accessToken: string;
  refreshToken: string;
};

type State = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

type Action = {
  type: string;
  payload?: Record<string, any>;
};

const initialState: State = {
  user: null,
  isLoading: false,
  error: null,
};

const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload?.user,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

type AuthContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: JSON.parse(userData) },
      });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("userData", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("userData");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
