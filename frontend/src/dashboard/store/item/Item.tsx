import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import arrow_left from "../../../assets/arrow_left.svg";
import EditItem from "../../../components/Edit-Item";
import ItemDetailBox from "../../../components/Item-detail";
import EditIcon from "../../../assets/edit.svg";
import InventoryTable from "../../../components/Table/Inventory-Table";
import AddInventoryDialogBox from "../../../components/Dialog/Add-Inventory-Dialog";

export default function ItemDetial() {
  const { id } = useParams<{ id: string }>();
  const [isItem, setItem] = useState<any>();
  const [isEdit, setEdit] = useState<boolean>();
  const [isLiveInve, setLiveInve] = useState<any[]>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await api.get(`/items?id=${Number(id)}`);
      setItem(res.data.item);

      const live = [
        { id: 1, itemId: 1, quantity: 5, price: 100, salePrice: 100 },
        { id: 2, itemId: 1, quantity: 5, price: 100, salePrice: 100 },
      ];
      setLiveInve(live);
    };
    fetchItem();
  }, [isItem]);

  const deleteItem = async () => {
    const res = await api.delete(`/items/${id}`);
    redirect("/dashboard/store");
  };

  if (isItem) {
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
            <h1 className="text-2xl font-bold">Item Details</h1>
          </div>

          <div className="flex max-xl:flex-col gap-8">
            <div className="flex justify-center mt-10">
              <div className="bg-white p-6 rounded-xl">
                {isEdit && (
                  <div>
                    <div className="flex justify-between">
                      <div className="text-xl font-bold ">Item Edit</div>
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
                    <EditItem item={isItem} />
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
                    <ItemDetailBox item={isItem} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <div>
                <div className="w-full flex justify-between mt-10 mb-4">
                  <h1 className="text-2xl font-bold">Live Inventory</h1>
                  <button
                    className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                    onClick={() => setDialogOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#FFFFFF"
                    >
                      <path d="M434.5-434.5H191.87v-91H434.5v-242.63h91v242.63h242.63v91H525.5v242.63h-91V-434.5Z" />
                    </svg>
                  </button>
                </div>
                {isLiveInve && <InventoryTable data={isLiveInve} />}
              </div>

              <div>
                <div className="w-full flex mt-10 mb-4">
                  <h1 className="text-2xl font-bold">Empty Inventory</h1>
                </div>
                {isLiveInve && <InventoryTable data={isLiveInve} />}
              </div>
            </div>
          </div>
        </div>

        <AddInventoryDialogBox
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          itemId={isItem.id}
        />
      </>
    );
  }
}
