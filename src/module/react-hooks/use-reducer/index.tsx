import { Button } from "@/components/ui/button";
import { useReducer } from "react";
import { initialState, reducers } from "./state/Store";

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <div>
      <h1>Counter</h1>
      <p>Current count: {state.counter}</p>
      <div className="flex gap-2">
        <Button onClick={() => dispatch({ type: "increment" })}>
          increment
        </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>
          decrement
        </Button>
      </div>
    </div>
  );
};

export default UseReducer;
