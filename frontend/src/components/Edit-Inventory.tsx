import { useEffect, useState } from "react";
import { api } from "../services/api";
import ErrorDialog from "./ErrorDialog";

interface Props {
  inventory: any;
  type: "live" | "empty" | string | null;
}

export default function EditInventory({ inventory, type }: Props) {
  const [isInventory, setInventory] = useState<any>(inventory);
  const [isChange, setChange] = useState<boolean>();
  const [msg, setMsg] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {}, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNumber?: boolean
  ) => {
    const { name, value } = e.target;

    if (isNumber) {
      setInventory((prev: any) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setInventory((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }

    setChange(true);
  };

  const handleSubmit = async () => {
    let query = ``;
    if (type == "live") {
      query = `/inventory/${Number(isInventory.id)}`;
    } else {
      query = `/inventory/empty/${Number(isInventory.id)}`;
    }
    const res = await api.patch(query, {
      quantity: Number(isInventory.quantity),
      stock: Number(isInventory.stock),
      price: Number(isInventory.price),
      salePrice: Number(isInventory.salePrice),
    });
    setMsg(res.data.message);
    setInventory(res.data.updatedInventory);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Inventory Id</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isInventory.id}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Item Id</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isInventory.itemId}
              name="itemId"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Quantity</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isInventory.quantity}
            name="quantity"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Stock</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isInventory.stock}
            name="stock"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sale</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isInventory.price}
              name="price"
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sale Price</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isInventory.salePrice}
              name="salePrice"
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
        </div>

        <div className="w-full h-0.5 my-4 bg-neutral-200"></div>

        <div className="flex justify-center">
          {!isChange ? (
            <button
              type="button"
              disabled={true}
              className="w-64 py-2.5 font-medium rounded-4xl transition cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2
                     disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              className="w-64 py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              onClick={handleSubmit}
            >
              Update
            </button>
          )}
        </div>
      </div>

      <ErrorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message={msg}
      />
    </>
  );
}
