import useStore from "@/services/state/store";

const Counter = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[200px] h-36 bg-gray-950 rounded-xl p-4 flex flex-col justify-between">
        <h3 className="text-5xl text-center">{count}</h3>
        <div className="flex justify-between gap-2">
          <button
            onClick={decrement}
            className="text-2xl border-2 border-red-500 w-full rounded-lg cursor-pointer"
          >
            -
          </button>
          <button
            onClick={increment}
            className="text-2xl border-2 border-blue-500 w-full rounded-lg cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
