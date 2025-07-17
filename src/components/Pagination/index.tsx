import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  skip: number;
  limit: number;
  total: number;
};

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  skip,
  limit,
  total,
}: Props) => {
  return (
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
  );
};

export default Pagination;
