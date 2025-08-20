import { useEffect, useState } from "react";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import arrow_left from "../../../assets/arrow_left.svg";
import EditItem from "../../../components/Edit-Item";
import ItemDetailBox from "../../../components/Item-detail";
import EditIcon from "../../../assets/edit.svg";
import InventoryDetailBox from "../../../components/Inventory-Detail";
import EditInventory from "../../../components/Edit-Inventory";

export default function InventoryDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [isInventory, setInventory] = useState<any>();
  const [isEdit, setEdit] = useState<boolean>();

  useEffect(() => {
    const fetchItem = async () => {
      let query = ``;
      if (type == "live") {
        query = `/inventory/${Number(id)}`;
      } else {
        query = `/inventory/empty/${Number(id)}`;
      }
      const res = await api.get(query);
      setInventory(res.data);
    };
    fetchItem();
  }, []);

  const deleteItem = async () => {
    let query = ``;
    if (type == "live") {
      query = `/inventory/${Number(id)}`;
    } else {
      query = `/inventory/empty/${Number(id)}`;
    }
    const res = await api.delete(query);
    redirect("/dashboard/store");
  };

  if (isInventory) {
    return (
      <>
        <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-8 mt-1">
          <div className="w-full flex gap-2 items-center">
            <Link
              to={`/dashboard/store/`}
              className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
            >
              <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
            </Link>
            <h1 className="text-2xl font-bold">Inventory Details</h1>
          </div>

          <div className="flex justify-center mt-10">
            <div className="bg-white p-6 rounded-xl">
              {isEdit && (
                <div>
                  <div className="flex justify-between">
                    <div className="text-xl font-bold ">Inventory Edit</div>
                    <button
                      className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={() => setEdit(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-0.5 mt-4 mb-2 bg-neutral-200"></div>
                  <EditInventory inventory={isInventory} type={type} />
                </div>
              )}

              {!isEdit && (
                <div>
                  <div className="flex justify-end gap-4">
                    <button
                      className="bg-white rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={() => setEdit(true)}
                    >
                      <img src={EditIcon} alt="edit" className="w-5" />
                    </button>
                    <button
                      className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={deleteItem}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-0.5 mt-4 mb-2 bg-neutral-200"></div>
                  <InventoryDetailBox inventory={isInventory} />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
