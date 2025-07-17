import { useNavigate, useSearchParams } from "react-router";

type Props = {
  data: any;
  loading: boolean;
  setSearch: (search: string) => void;
};

const ListData = ({ data, loading, setSearch }: Props) => {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  const handleBackToHome = () => {
    setSearchParams({});
    setSearch("");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md w-full gap-4 mx-auto bg-gray-950 p-4 flex-1 overflow-auto rounded-lg pt-10">
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        data.map((user: any) => (
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
  );
};

export default ListData;
