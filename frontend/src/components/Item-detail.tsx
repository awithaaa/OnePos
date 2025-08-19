import { useState } from "react";

interface Props {
  item: any;
}

export default function ItemDetailBox({ item }: Props) {
  const [isItem, setItem] = useState<any>(item);

  return (
    <>
      <div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Item Id</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isItem.id}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">SUK</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isItem.suk}
              name="suk"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Name</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isItem.name}
            name="name"
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Brand</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isItem.brand}
            name="brand"
            readOnly
          />
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sale</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isItem.price}
              name="price"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sale Price</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isItem.salePrice}
              name="salePrice"
              readOnly
            />
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Discount</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isItem.discount}
              name="discount"
              readOnly
            />
          </div>
        </div>

        <div className="w-full h-0.5 my-4 bg-neutral-200"></div>
      </div>
    </>
  );
}
