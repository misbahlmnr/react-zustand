import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ReactHooks = () => {
  // const [count, setCount] = useState(0);
  // const increment = () => setCount((prevCount) => prevCount + 1);
  // const decrement = () =>
  //   setCount((prevCount) => {
  //     if (prevCount === 0) return 0;
  //     return prevCount - 1;
  //   });
  // return (
  //   <div>
  //     <h1>Counter</h1>
  //     <p>{count}</p>
  //     <Button onClick={decrement}>-</Button>
  //     <Button onClick={increment}>+</Button>
  //   </div>
  // );
  // const [input, setInput] = useState<string>("");
  // const [isActive, setIsActive] = useState<boolean>(false);
  // useEffect(() => console.log("rendered"), []);
  // useEffect(
  //   () => console.log(`rendered if isActive is True: ${isActive}`),
  //   [isActive]
  // );
  // const [positionScroll, setPositionScroll] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setPositionScroll(window.scrollY);
  //   };
  //   console.log("attaching");
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     console.log("detaching");
  //     return window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // console.log(positionScroll);
  // return (
  //   <div>
  //     <h1>Using UseEffect</h1>
  //     {/* <p>This value input: {input}</p> */}
  //     {/* <Input
  //       value={input}
  //       onChange={(e) => setInput(e.target.value)}
  //       placeholder="Input here..."
  //     /> */}
  //     {/* <p>This value isActive: {isActive ? "true" : "false"}</p>
  //     <Button onClick={() => setIsActive(!isActive)}>Click Here!</Button> */}
  //     <div className="h-[5000px]"></div>
  //   </div>
  // );

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default ReactHooks;
