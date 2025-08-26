import { useState } from "react";

interface Items {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  discount?: number;
}

interface Props {
  item: Items;
  handleUpdated: (item: Items) => void;
  handleClose: () => void;
  handleRemove: () => void;
}

export default function EditItemBill({
  item,
  handleUpdated,
  handleClose,
  handleRemove,
}: Props) {
  const [isId, setId] = useState<string>(item.id.toString());
  const [isSuk, setSuk] = useState<string>("");
  const [isName, setName] = useState<string>(item.name);
  const [isQuantity, setQuantity] = useState<string>(item.qty.toString());
  const [isUnitPrice, setUnitPrice] = useState<string>(
    item.unitPrice.toString()
  );
  const [isDiscount, setDiscount] = useState<any>(
    item.discount?.toString() || "0"
  );

  const handleRemoveBtn = () => {
    handleRemove();
  };

  const handleUpdateItem = () => {
    handleUpdated({
      id: Number(isId),
      name: isName,
      qty: Number(isQuantity),
      unitPrice: Number(isUnitPrice),
      total: Number(isUnitPrice) * Number(isQuantity),
      discount: Number(isDiscount),
    });
  };

  const handleCloseBtn = () => {
    handleClose();
  };

  return (
    <>
      <div className="w-90  bg-white rounded-lg p-4 shadow-xl">
        <div className="flex justify-between">
          <p className="font-bold text-xl">Edit Item</p>
          <button
            className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
            onClick={handleCloseBtn}
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
        <div className="my-2 w-full h-0.5 bg-neutral-200"></div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="ml-1 mb-1">ID/ SUK</label>
            <input
              className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isId}
              readOnly
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
              onClick={handleRemoveBtn}
            >
              Remove
            </button>
            <button
              className="w-full py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              onClick={handleUpdateItem}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
