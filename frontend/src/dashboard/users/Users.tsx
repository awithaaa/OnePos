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
  const [isSearchType, setSearchType] = useState<string>("id");

  const fetctUsers = async () => {
    try {
      const res = await api.get(`/users?start=${isStart - 1}&size=10`);
      setUsers(res.data.users);
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
    fetctUsers();
  }, [isStart]);

  const handleFilter = () => {
    setFilters("");
    fetctUsers();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const fetchUsers = async () => {
        let query = "";
        if (isSearchType == "id") {
          query = `/users?id=${isSearch}`;
        } else {
          query = `/users?name=${isSearch}`;
        }
        try {
          const res = await api.get(query);
          if (isSearchType == "id") {
            setUsers([res.data.user]);
          } else {
            setUsers(res.data.user);
          }
          setFilters(`Search: ${isSearch}`);
          setCount(
            `Showing ${isStart} to ${res.data.count} of ${res.data.count} results`
          );
          setSearch("");
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
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
                <div className="bg-white w-auto px-4 py-1.5 rounded-lg flex items-center gap-2">
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
                <div className="flex rounded-lg outline-1 outline-gray-300">
                  <input
                    className="w-64 text-base px-2 py-1.5 rounded-l-lg placeholder:text-gray-400 border-r-2 border-gray-300 focus:outline-none"
                    type="text"
                    placeholder="Search Users"
                    value={isSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="w-24 bg-white py-1.5 px-2 rounded-r-lg">
                    <select
                      className="w-full text-base bg-white focus:outline-none"
                      value={isSearchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="id">ID</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
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
