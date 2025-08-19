import { Button, buttonVariants } from "@/components/ui/button";
import { AuthContext, AuthProvider } from "./state/StoreAuth";
import { FormEvent, useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// import { useReducer } from "react";
// import { initialState, reducers } from "./state/StoreCounter";

// use reducer case counter

// const UseReducer = () => {
//   const [state, dispatch] = useReducer(reducers, initialState);
//   return (
//     <div>
//       <h1>Counter</h1>
//       <p>Current count: {state.counter}</p>
//       <div className="flex gap-2">
//         <Button onClick={() => dispatch({ type: "increment" })}>
//           increment
//         </Button>
//         <Button onClick={() => dispatch({ type: "decrement" })}>
//           decrement
//         </Button>
//       </div>
//     </div>
//   );
// };

// use reducer case auth
const UseReducer = () => {
  console.log("entry point");
  return (
    <AuthProvider>
      <Navbar />
      <ConsumeAuthContext />
    </AuthProvider>
  );
};

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  console.log("navbar");

  return (
    <header className="flex justify-between h-[60px] bg-blue-500 items-center px-4 md:px-60">
      <h1 className="text-white">MyApp</h1>
      <nav>
        {user ? (
          <div className="flex gap-2 items-center">
            <p className="text-white">{user.firstName}</p>
            <Button
              className={buttonVariants()}
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button className={buttonVariants()}>Login</Button>
        )}
      </nav>
    </header>
  );
};

type Payload = { username: string; password: string };

const ConsumeAuthContext = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isLoading } = state;
  const [form, setForm] = useState({ username: "", password: "" });

  const submitHandler =
    (callback: (payload: Payload) => void) => (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      callback({ username: form.username, password: form.password });
    };

  const onSubmit = async (payload: Payload) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data } });
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_ERROR", payload: { error: err } });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow mt-5">
      <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
      <form onSubmit={submitHandler(onSubmit)} className="flex flex-col gap-2">
        <Input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          disabled={isLoading}
          className={cn(
            buttonVariants(),
            "disabled:cursor-not-allowed disabled:opacity-80"
          )}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default UseReducer;
