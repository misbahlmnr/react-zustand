type State = {
  counter: number;
};

type Action = {
  type: "increment" | "decrement";
  payload?: number;
};

const initialState: State = {
  counter: 0,
};

const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export { initialState, reducers };
