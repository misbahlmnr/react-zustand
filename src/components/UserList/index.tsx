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

  const handleGotoPage = (page: number) => {
    console.log(page - 1);
    setSkip((page - 1) * limit);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSearchParams({ q: search });

    setSkip(0);
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-screen p-10 gap-5 md:gap-10">
      <SearchForm search={search} setSearch={setSearch} onSubmit={onSubmit} />
      <div className="flex-1 flex-grow overflow-auto bg-white shadow-md p-4">
        <ListData data={users} loading={loading} setSearch={setSearch} />
      </div>
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleGotoPage={handleGotoPage}
        skip={skip}
        limit={limit}
        total={total}
      />
    </div>
  );
}

export default UserList;
