import { useEffect, useState } from "react";
import { api } from "../../services/api";
import closeIcon from "../../assets/close.svg";
import BillTable from "../../components/Table/Bills-Table";
import { Link } from "react-router-dom";

export default function Bill() {
  const [isSales, setSales] = useState<any[]>();
  const [isStart, setStart] = useState<number>(1);
  const [isSearch, setSearch] = useState<string | "">("");
  const [isFilters, setFilters] = useState<string>("");
  const [isCount, setCount] = useState<string>("");
  const [isPagination, setPagintaion] = useState<boolean>(true);
  const [isSearchType, setSearchType] = useState<string>("id");

  const fetchItems = async () => {
    try {
      const res = await api.get(`/sales?start=${isStart - 1}&size=10`);
      setSales(res.data.sales);
      let end = 0;
      if (res.data.count <= 10) setPagintaion(false);
      if (res.data.count < isStart + 9) {
        end = res.data.count;
      } else {
        end = isStart + 9;
      }
      setCount(`Showing ${isStart} to ${end} of ${res.data.count} results`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [isStart]);

  const handleFilter = () => {
    setFilters("");
    fetchItems();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const fetchItems = async () => {
        let query = "";
        if (isSearchType == "id") {
          query = `/sales?id=${isSearch}`;
        } else if (isSearchType == "customer") {
          query = `/sales?customer=${isSearch}`;
        }
        try {
          const res = await api.get(query);
          console.log("yeh");
          if (isSearchType == "id") {
            setSales([res.data.sale]);
          } else if (isSearchType == "customer") {
            setSales(res.data.sale);
          }
          setFilters(`Search ${isSearchType}: ${isSearch}`);
          setCount(
            `Showing ${isStart} to ${res.data.count} of ${res.data.count} results`
          );
          setSearch("");
        } catch (error) {
          console.log(error);
        }
      };
      fetchItems();
    }
  };

  const handlePrevious = () => {
    setStart(isStart - 10);
  };

  const handleNext = () => {
    setStart(isStart + 10);
  };

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bills</h1>
            <div className="flex gap-4">
              {isFilters && (
                <div className="bg-white px-4 py-1.5 rounded-lg flex items-center gap-2">
                  {isFilters}{" "}
                  <img
                    src={closeIcon}
                    alt="x"
                    className="w-5 cursor-pointer"
                    onClick={handleFilter}
                  />
                </div>
              )}
              <div className="flex rounded-lg outline-1 outline-gray-300">
                <input
                  className="w-64 text-base px-2 py-1.5 rounded-l-lg placeholder:text-gray-400 border-r-2 border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Search Bills"
                  value={isSearch}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="w-28 bg-white py-1.5 px-2 rounded-r-lg">
                  <select
                    className="w-full text-base bg-white focus:outline-none"
                    value={isSearchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="id">ID</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
              </div>
              <Link
                className="flex items-center justify-center px-6 py-1.5 rounded-lg p-4 text-center font-medium cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2 transition"
                to={"/dashboard/bill/create"}
              >
                Add Bill
              </Link>
            </div>
          </div>

          <div className="mt-4">
            {isSales && <BillTable data={isSales} />}

            <div className="bg-white rounded-b-xl flex items-center justify-between gap-4 py-4 px-4">
              <div>
                <p className="font-medium">{isCount}</p>
              </div>
              {isPagination && (
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-white text-black font-medium rounded-xl hover:bg-black hover:text-white outline-2  transition cursor-pointer"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-black text-white font-medium rounded-xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
