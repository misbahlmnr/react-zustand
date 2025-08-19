import React, { FormEvent, useContext, useState } from "react";
import { LanguageContext, LanguageProvider } from "./context/LanguageContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { Input } from "@/components/ui/input";

const UseContext = () => {
  return (
    <AuthContextProvider>
      <LanguageProvider>
        <ChildrenComponent />
      </LanguageProvider>
    </AuthContextProvider>
  );
};

const ChildrenComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { language, setLanguageHandler } = useContext(LanguageContext);
  const { login } = useContext(AuthContext);

  const loginHandler = (payload: { username: string; password: string }) => {
    try {
      fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => login(data))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    loginHandler({ username, password });
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-[90vh] flex flex-col items-center justify-center gap-2">
        <h1>{language === "id" ? "Selamat Datang" : "Welcome"}</h1>
        <div className="flex gap-2">
          <Button onClick={() => setLanguageHandler("en")}>English</Button>
          <Button onClick={() => setLanguageHandler("id")}>Indonesia</Button>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="p-2 shadow-md mt-5 flex flex-col gap-2"
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Login</Button>
        </form>
      </div>
    </>
  );
};

// wrapping dengan use memo untuk mencegah re-render tidak perlu
const Navbar = React.memo(() => {
  const { user, logout } = useContext(AuthContext);
  console.log("ok");
  return (
    <header className="flex justify-between h-[60px] bg-blue-500 items-center px-60">
      <h1 className="text-white">MyApp</h1>
      <nav>
        {user ? (
          <div className="flex gap-2 items-center">
            <p className="text-white">{user.firstName}</p>
            <Button className={buttonVariants()} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button className={buttonVariants()}>Login</Button>
        )}
      </nav>
    </header>
  );
});

export default UseContext;
