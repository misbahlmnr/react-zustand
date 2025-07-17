import { ChevronLeft, ChevronRight, CornerDownLeft } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const limit = 30;

function UserList() {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [search, setSearch] = useState(query);

  const navigate = useNavigate();

  useEffect(() => {
    if (query) return;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
        );
        const dataUsers = await res.json();
        console.log("ke 2");
        setUsers(dataUsers.users);
        setTotal(dataUsers.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [skip, query]);

  const handleNextPage = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSearchParams({ q: search });

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/users/search?q=${search}`);
      const dataUsers = await res.json();
      setUsers(dataUsers.users);
      setTotal(dataUsers.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setSearchParams({});
    setSearch("");
    navigate("/");
  };

  useEffect(() => {
    if (!query) return;

    const doSearch = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/users/search?q=${search}`
        );
        const dataUsers = await res.json();
        console.log("ke 1");
        setUsers(dataUsers.users);
        setTotal(dataUsers.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [query]);

  return (
    <div className="flex flex-col w-full h-screen p-10 gap-5">
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

      <div className="flex flex-col items-center justify-center max-w-md w-full gap-4 mx-auto bg-gray-950 p-4 flex-1 overflow-auto rounded-lg pt-10">
        {loading ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          users.map((user: any) => (
            <div key={user.id} className=" bg-gray-800 w-full p-4 rounded-lg">
              <h1 className="text-center">{user.firstName}</h1>
            </div>
          ))
        ) : (
          <>
            <p>No users found</p>
            <button
              onClick={handleBackToHome}
              className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
              Back to home
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handlePrevPage}
          disabled={skip === 0}
          className="p-2 bg-gray-950 hover:cursor-pointer rounded-lg disabled:cursor-not-allowed disabled:bg-gray-800"
        >
          <ChevronLeft />
        </button>
        <span>Page {Math.floor(skip / limit) + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={skip + limit >= total}
          className="p-2 bg-gray-950 rounded-lg hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-800"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default UserList;
