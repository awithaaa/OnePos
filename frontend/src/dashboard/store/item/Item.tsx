import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import arrow_left from "../../../assets/arrow_left.svg";
import EditItem from "../../../components/Edit-Item";
import ItemDetailBox from "../../../components/Item-detail";
import EditIcon from "../../../assets/edit.svg";
import InventoryTable from "../../../components/Table/Inventory-Table";
import AddInventoryDialogBox from "../../../components/Dialog/Add-Inventory-Dialog";
import ConfirmationBox from "../../../components/Confirmation-Box";
import DialogBox from "../../../components/DialogBox";
import { useAuth } from "../../../contexts/AuthContext";

export default function ItemDetail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isItem, setItem] = useState<any>();
  const [isEdit, setEdit] = useState<boolean>();
  const [isLiveInve, setLiveInve] = useState<any[]>();
  const [isEmptyInve, setEmptyInve] = useState<any[]>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isConfirmation, setConfirmation] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");
  const [isButton, setButton] = useState<string>("");

  useEffect(() => {
    const fetchItem = async () => {
      const res = await api.get(`/items?id=${Number(id)}`);
      setItem(res.data.item);

      const resInve = await api.get(`/inventory?itemId=${Number(id)}`);
      setLiveInve(resInve.data.inventory);
      setEmptyInve(resInve.data.emptyInventory);
    };
    fetchItem();
  }, []);

  const deleteItem = async () => {
    try {
      await api.delete(`/items/${id}`);
      navigate("/dashboard/store");
    } catch (error: any) {
      newAlert(
        "Failed",
        error.response?.data?.message || "Failed to fetch sale",
        "error"
      );
    } finally {
      setConfirmation(false);
    }
  };

  const newAlert = (title: string, msg: string, type?: any) => {
    setType("error");
    setMsgTitle("");
    setMsg("");
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  const newConfirmation = (title: string, msg: string, button: string) => {
    setMsgTitle(title);
    setMsg(msg);
    setButton(button);
    setConfirmation(true);
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
                        className={`bg-white rounded-full w-8 h-8 border-2 p-1 ${
                          user?.role === "admin"
                            ? "cursor-pointer border-black"
                            : "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500 opacity-50"
                        }`}
                        onClick={() => {
                          if (user?.role === "admin") {
                            setEdit(true);
                          }
                        }}
                        disabled={user?.role !== "admin"}
                      >
                        <img src={EditIcon} alt="edit" className="w-5" />
                      </button>
                      <button
                        className={`rounded-full w-8 h-8 border-2 p-1 
                          ${
                            user?.role === "admin"
                              ? "bg-black border-black cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                          }
                        `}
                        onClick={() => {
                          if (user?.role === "admin") {
                            newConfirmation(
                              "Are you sure?",
                              "This action cannot be undone. All associated data will also be deleted.",
                              "Delete Permanently"
                            );
                          }
                        }}
                        disabled={user?.role !== "admin"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill={user?.role === "admin" ? "#FFFFFF" : "#6a7282"}
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
                    className={`rounded-full w-8 h-8 border-2 p-1 ${
                      user?.role === "admin"
                        ? "bg-black border-black cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => {
                      if (user?.role === "admin") {
                        setDialogOpen(true);
                      }
                    }}
                    disabled={user?.role !== "admin"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill={user?.role === "admin" ? "#FFFFFF" : "#6a7282"}
                    >
                      <path d="M434.5-434.5H191.87v-91H434.5v-242.63h91v242.63h242.63v91H525.5v242.63h-91V-434.5Z" />
                    </svg>
                  </button>
                </div>
                {isLiveInve && <InventoryTable data={isLiveInve} type="live" />}
              </div>

              <div>
                <div className="w-full flex mt-10 mb-4">
                  <h1 className="text-2xl font-bold">Empty Inventory</h1>
                </div>
                {isEmptyInve && (
                  <InventoryTable data={isEmptyInve} type="empty" />
                )}
              </div>
            </div>
          </div>
        </div>

        <AddInventoryDialogBox
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          itemId={isItem.id}
        />

        <ConfirmationBox
          isOpen={isConfirmation}
          onClose={() => setConfirmation(false)}
          message={isMsg}
          title={isMsgTitle}
          secondButton={isButton}
          sbAction={deleteItem}
        />

        <DialogBox
          isOpen={isAlertOpen}
          onClose={() => setAlertOpen(false)}
          message={isMsg}
          title={isMsgTitle}
          type={isType}
        />
      </>
    );
  }
}
