import { useState } from "react";
import ErrorDialog from "./ErrorDialog";

interface Props {
  item: any;
}

export default function ItemDetailBox({ item }: Props) {
  const [isItem, setItem] = useState<any>(item);
  const [isEdit, setEdit] = useState<boolean>();
  const [msg, setMsg] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        {/* <div className="flex justify-center">
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
            </div> */}
      </div>

      <ErrorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message={msg}
      />
    </>
  );
}
