import { useEffect, useState } from "react";

interface Props {
  inventory: any;
}

export default function InventoryDetailBox({ inventory }: Props) {
  const [isInventory, setInventory] = useState<any>(inventory);

  useEffect(() => {}, [inventory]);

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
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Stock</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isInventory.stock}
            readOnly
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
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sale Price</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isInventory.salePrice}
              name="salePrice"
              readOnly
            />
          </div>
        </div>

        <div className="w-full h-0.5 my-4 bg-neutral-200"></div>
      </div>
    </>
  );
}
