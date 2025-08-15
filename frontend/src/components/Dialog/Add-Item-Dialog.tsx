import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { api } from "../../services/api";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddItemDialogBox({ isOpen, onClose }: DialogProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [suk, setSuk] = useState("");
  const [discount, setDiscount] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [salePrice, setSalePrice] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/items", {
        name,
        brand,
        suk,
        discount: Number(discount),
        price: Number(price),
        salePrice: Number(salePrice),
      });
      setName("");
      setBrand("");
      setSuk("");
      setDiscount("");
      setPrice("");
      setSalePrice("");
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        console.log(err);
        setError("Something went wrong, please try again.");
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-600 opacity-80" />
        </TransitionChild>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Item
                  <div className="my-2 w-full h-0.5 bg-neutral-200"></div>
                </DialogTitle>

                <div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">Brand</label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">SUK</label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={suk}
                        onChange={(e) => setSuk(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">Discount</label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">
                        Price <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="ml-1 mb-1">
                        Sale Price <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="number"
                        value={salePrice}
                        onChange={(e) => setSalePrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Box */}
                {error && (
                  <div className="mt-4 p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex flex-col items-center">
                  <div className="mb-4 w-full h-0.5 bg-neutral-200"></div>

                  <button
                    type="button"
                    className="w-[90%] py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                    onClick={handleSubmit}
                  >
                    {loading ? "Processing..." : "Process"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
