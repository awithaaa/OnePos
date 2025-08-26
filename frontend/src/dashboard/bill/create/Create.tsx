import { Link } from "react-router-dom";
import arrow_left from "../../../assets/arrow_left.svg";
import InfoIcon from "../../../assets/arrow_right.svg";
import { useEffect, useState } from "react";

interface Items {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  discount?: number;
}

export default function CreateBill() {
  const [customer, setCustomer] = useState<string>("");

  const [items, setItems] = useState<Items[]>([
    { id: 1, name: "No", qty: 1, unitPrice: 100, total: 100 },
  ]);
  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Name", width: "w-1/3" },
    { header: "Qty", width: "w-1/12" },
    { header: "Unit Price", width: "w-1/6" },
    { header: "Total", width: "w-1/6" },
    { header: "Discount", width: "w-1/8" },
    { header: "", width: "w-1/12" },
  ];

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div className="w-full flex gap-2 items-center">
          <Link
            to={`/dashboard/bill`}
            className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
          >
            <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
          </Link>
          <h1 className="text-2xl font-bold">Create New Bill</h1>
        </div>

        <div className="flex justify-between my-3">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base">Customer Name</label>
            <input
              className="w-96 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
        </div>

        <div className="my-2 w-full h-0.5 bg-neutral-200"></div>

        <div className="mt-4 flex gap-4">
          <div className="w-full">
            <p className="font-bold text-xl">Items</p>
            <div className="mt-4 flex flex-col">
              <table className="table-fixed w-full  rounded-t-xl overflow-hidden">
                <thead className="w-full h-10 bg-black rounded-t-lg text-white">
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className={`${col.width} border border-gray-200 px-4 py-2`}
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {items.map((item: Items, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="border-r-1 border-l-0 border-gray-200 px-4 py-4 text-center">
                        {index + 1}
                      </td>
                      <td className="border-r-1 border-gray-200 px-4 py-4">
                        {item.name}
                      </td>
                      <td className="border-r-1 border-gray-200 px-4 py-4">
                        {item.qty}
                      </td>
                      <td className="border-r-1 border-gray-200 px-4 py-4">
                        {item.unitPrice}
                      </td>
                      <td className="border-r-1 border-gray-200 px-4 py-4">
                        {item.total}
                      </td>
                      <td className="border-r-1 border-gray-200 px-4 py-4">
                        {item.discount || "-"}
                      </td>
                      <td className="border-r-0 border-gray-200 px-4 py-4 flex justify-center">
                        <Link to={`/dashboard/`}>
                          <img
                            src={InfoIcon}
                            alt="info"
                            className="cursor-pointer"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-[500px]  bg-white rounded-lg p-4 shadow-xl">
            <p className="font-bold text-xl">Add Item</p>
            <div className="my-2 w-full h-0.5 bg-neutral-200"></div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="ml-1 mb-1">ID/ SUK</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="ml-1 mb-1">Name</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="ml-1 mb-1">Brand</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="ml-1 mb-1">Quantity</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="ml-1 mb-1">Unit Price</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="ml-1 mb-1">Discount</label>
                <input
                  className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                  type="text"
                />
              </div>

              <div className="flex justify-between gap-4 mt-2">
                <button className="w-full py-2.5 text-black bg-white outline-2  font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer">
                  Clear
                </button>
                <button className="w-full py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <p className="font-bold text-xl">Add Item</p>
          <div className="flex justify-between gap-4 my-3">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-base">ID/ SUK</label>
              <input
                className="w-96 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-base">Item Name</label>
              <input
                className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                type="text"
              />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
