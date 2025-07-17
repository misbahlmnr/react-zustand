import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router";
import SearchForm from "../SearchForm";
import ListData from "../ListData";
import Pagination from "../Pagination";
import { useGetUsers } from "@/hooks/useGetUsers";

const limit = 30;

function UserList() {
  const [skip, setSkip] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [search, setSearch] = useState(query);

  const { users, total, loading } = useGetUsers({ query, limit, skip });

  const handleNextPage = () => {
    if (skip + limit < total) setSkip(skip + limit);
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) setSkip(skip - limit);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSearchParams({ q: search });

    setSkip(0);
  };

  return (
    <div className="flex flex-col w-full h-screen p-10 gap-5">
      <SearchForm search={search} setSearch={setSearch} onSubmit={onSubmit} />
      <ListData data={users} loading={loading} setSearch={setSearch} />
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        skip={skip}
        limit={limit}
        total={total}
      />
    </div>
  );
}

export default UserList;
