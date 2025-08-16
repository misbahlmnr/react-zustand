import { FormEvent } from "react";
import { Input } from "../ui/input";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const SearchForm = ({ search, setSearch, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="text-sm"
      />
    </form>
  );
};

export default SearchForm;
