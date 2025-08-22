import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-4 pb-4">
        <Link
          className="flex flex-col bg-white items-center justify-center gap-3 w-32 h-32 rounded-lg p-4 text-center cursor-pointer"
          to={"/dashboard/bill/create"}
        >
          <span className="font-bold text-5xl">+</span>
          Create Bill
        </Link>
      </div>
    </>
  );
}
