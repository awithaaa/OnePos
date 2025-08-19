import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import arrow_left from "../../../assets/arrow_left.svg";
import ErrorDialog from "../../../components/ErrorDialog";

export default function ItemDetial() {
  const { id } = useParams<{ id: string }>();
  const [isItem, setItem] = useState<any>();
  const [isChange, setChange] = useState<boolean>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await api.get(`/items?id=${Number(id)}`);
      setItem(res.data.item);
    };
    fetchItem();
  }, []);

  const handleSubmit = async () => {
    const res = await api.patch(`/items/${Number(id)}`, {
      name: isItem.name,
      brand: isItem.brand,
      suk: isItem.suk,
      price: Number(isItem.price),
      salePrice: Number(isItem.salePrice),
      discount: Number(isItem.discount),
    });
    setMsg(res.data.message);
    setItem(res.data.item);
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNumber?: boolean
  ) => {
    const { name, value } = e.target;

    if (isNumber) {
      setItem((prev: any) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setItem((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }

    setChange(true);
  };

  if (isItem) {
    return (
      <>
        <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
          <div className="w-full flex gap-2 items-center">
            <Link
              to={`/dashboard/store/`}
              className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
            >
              <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
            </Link>
            <h1 className="text-2xl font-bold">Item Details</h1>
          </div>

          <div className="flex justify-center mt-10">
            <div className="bg-white p-6 rounded-xl">
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
                      onChange={(e) => handleInputChange(e)}
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
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label className="font-semibold text-lg">Brand</label>
                  <input
                    className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="text"
                    value={isItem.brand}
                    name="brand"
                    onChange={(e) => handleInputChange(e)}
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
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-lg">Sale Price</label>
                    <input
                      className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                      type="text"
                      value={isItem.salePrice}
                      name="salePrice"
                      onChange={(e) => handleInputChange(e, true)}
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
            </div>
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
}
