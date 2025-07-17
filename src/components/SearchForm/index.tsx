import { FormEvent } from "react";
import { CornerDownLeft } from "lucide-react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const SearchForm = ({ search, setSearch, onSubmit }: Props) => {
  return (
    <form className="mx-auto max-w-lg w-full" onSubmit={onSubmit}>
      <div className="flex bg-gray-950 p-2 rounded-lg w-full gap-3">
        <input
          type="search"
          placeholder="Search user"
          value={search}
          className="flex-1 outline-none bg-transparent text-white pl-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer">
          <CornerDownLeft />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
