import { useState } from "react";
import { api } from "../services/api";
import DialogBox from "./DialogBox";

interface Items {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  discount?: number;
}

interface Props {
  handleItem: (item: Items) => void;
}

export default function AddItemBill({ handleItem }: Props) {
  const [isId, setId] = useState<string>();
  const [isSuk, setSuk] = useState<string>("");
  const [isName, setName] = useState<string>("");
  const [isBrand, setBrand] = useState<string>("");
  const [isQuantity, setQuantity] = useState<string>("1");
  const [isUnitPrice, setUnitPrice] = useState<string>("");
  const [isDiscount, setDiscount] = useState<any>("0");

  const [isDialogOpen, setDialogOpen] = useState<boolean>(true);
  const [isMsg, setMsg] = useState<string>("I don't know");
  const [isMsgTitle, setMsgTitle] = useState<string>("ERROR");

  const handleOnIdSUK = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const res = await api.get(`/items?id=${Number(isId)}`);
        setName(res.data.item.name);
        setBrand(res.data.item.brand);
        setUnitPrice(res.data.item.salePrice);
        setDiscount(res.data.item.discount);
      } catch (error: any) {
        if (error.status === 404) {
          setMsg(error.response.data.message);
          setMsgTitle(error.response.data.error);
          setDialogOpen(true);
          setId("");
          setName("");
          setBrand("");
          setUnitPrice("");
          setDiscount("0");
          setQuantity("1");
        }
      }
    }
  };

  const handleAddItem = () => {
    if (isName) {
      handleItem({
        id: Number(isId),
        name: isName,
        qty: Number(isQuantity),
        unitPrice: Number(isUnitPrice),
        total: Number(isUnitPrice) * Number(isQuantity),
        discount: Number(isDiscount),
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setId("");
    setName("");
    setBrand("");
    setUnitPrice("");
    setDiscount("0");
    setQuantity("1");
  };
  return (
    <>
      <div className="w-90  bg-white rounded-lg p-4 shadow-xl">
        <p className="font-bold text-xl">Add Item</p>
        <div className="my-2 w-full h-0.5 bg-neutral-200"></div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="ml-1 mb-1">ID/ SUK</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isId}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleOnIdSUK}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-1 mb-1">Name</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isName}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-1 mb-1">Brand</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isBrand}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-1 mb-1">Quantity</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isQuantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-1 mb-1">Unit Price</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isUnitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-1 mb-1">Discount</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isDiscount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-4 mt-2">
            <button
              className="w-full py-2.5 text-black bg-white outline-2  font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              onClick={handleClose}
            >
              Clear
            </button>
            <button
              className="w-full py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <DialogBox
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        message={isMsg}
        title={isMsgTitle}
        type="error"
      />
    </>
  );
}
