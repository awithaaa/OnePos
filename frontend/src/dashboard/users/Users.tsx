import { useEffect, useState } from "react";
import { api } from "../../services/api";
import closeIcon from "../../assets/close.svg";
import UsersTable from "../../components/Table/UsersTable";
import AddUserDialogBox from "../../components/Dialog/Add-User-Dialog";

export default function Users() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isUsers, setUsers] = useState<any[]>();
  const [isStart, setStart] = useState<number>(1);
  const [isSearch, setSearch] = useState<string | "">("");
  const [isFilters, setFilters] = useState<string>("");
  const [isCount, setCount] = useState<string>("");
  const [isPagination, setPagintaion] = useState<boolean>(true);

  const fetchItems = async () => {
    try {
      const res = await api.get(`/users?start=${isStart - 1}&size=9`);
      setUsers(res.data.users);
      let end = 0;
      let start = 0;
      if (res.data.count <= 10) setPagintaion(false);
      if (res.data.count < isStart + 9) {
        end = res.data.count;
      } else {
        end = isStart + 9;
      }
      if (isStart == 1) {
        start = isStart;
      } else {
        start = isStart + 1;
      }
      setCount(`Showing ${start} to ${end} of ${res.data.count} results`);
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
        try {
          const res = await api.get(`/items?name=${isSearch}`);
          setUsers(res.data.item);
          setFilters(`Search: ${isSearch}`);
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
    setStart(isStart - 9);
  };

  const handleNext = () => {
    setStart(isStart + 9);
  };

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Users</h1>
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
              <div>
                <input
                  className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                  placeholder="Search Users"
                  value={isSearch}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div
                className="flex items-center justify-center px-6 py-1.5 rounded-lg p-4 text-center font-medium cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2 transition"
                onClick={() => setDialogOpen(true)}
              >
                Add User
              </div>
            </div>
          </div>

          <div className="mt-4">
            {isUsers && <UsersTable data={isUsers} />}

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

      <div>
        <AddUserDialogBox
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        ></AddUserDialogBox>
      </div>
    </>
  );
}
