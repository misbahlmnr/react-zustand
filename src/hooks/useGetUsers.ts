import { useEffect, useState } from "react";

export const useGetUsers = ({
  query,
  limit,
  skip,
}: {
  query: string;
  limit: number;
  skip: number;
}) => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const urlApi = query
    ? `https://dummyjson.com/users/search?q=${query}`
    : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  useEffect(() => {
    setLoading(true);

    fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, limit, skip]);

  return { users, total, loading };
};
