import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import arrow_left from "../../assets/arrow_left.svg";
import InfoIcon from "../../assets/arrow_right.svg";
import DialogBox from "../../components/DialogBox";

export default function BillEdit() {
  const { id } = useParams<{ id: string }>();
  const [isSale, setSale] = useState<any>();
  const [isSaleItems, setSaleItems] = useState<any[]>([]);
  const [isCreated, setCreated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");

  const subtotal = isSaleItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const discount = isSaleItems.reduce(
    (sum, item) => sum + (item.discount || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.0;
  const total = subtotal + tax - discount;

  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Name", width: "w-1/3" },
    { header: "Qty", width: "w-1/12" },
    { header: "Unit Price", width: "w-1/6" },
    { header: "Total", width: "w-1/6" },
    { header: "Discount", width: "w-1/8" },
    { header: "", width: "w-1/12" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/sales/${id}`);
        setSale(res.data.sale);
        setSaleItems(res.data.saleItems);
        const createdDate = new Date(res.data.sale.createdAt);
        setCreated(createdDate.toLocaleDateString());
      } catch (err: any) {
        newAlert(
          "Failed",
          err.response?.data?.message || "Failed to fetch sale",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const newAlert = (title: string, msg: string, type?: any) => {
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div className="w-full flex gap-2 items-center">
          <Link
            to={"/dashboard/bill"}
            className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
          >
            <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
          </Link>
          <h1 className="text-2xl font-bold">Bill Details</h1>
        </div>

        <div className="flex justify-between my-3">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base">Customer Name</label>
            <input
              className="w-96 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isSale.customer}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base">Bill By</label>
            <input
              className="w-96 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={`${isSale.user.firstName} ${isSale.user.lastName}`}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base">Bill Date</label>
            <input
              className="w-72 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isCreated}
              readOnly
            />
          </div>
        </div>

        <div className="my-2 w-full h-0.5 bg-neutral-200"></div>

        <div>
          <p className="font-bold text-xl">Items</p>
          <div className="mt-4 flex gap-4">
            <div className="w-full">
              <div className="mt-4 flex flex-col">
                {isSaleItems && (
                  <table className="table-fixed w-full  rounded-xl overflow-hidden">
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
                      {isSaleItems.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className="border-b last:border-b-0 border-gray-200"
                        >
                          <td className="border-r-1 border-l-0 border-gray-200 px-4 py-4 text-center">
                            {index + 1}
                          </td>
                          <td className="border-r-1 border-gray-200 px-4 py-4">
                            {item.item.name}
                          </td>
                          <td className="border-r-1 border-gray-200 px-4 py-4">
                            {item.quantity}
                          </td>
                          <td className="border-r-1 border-gray-200 px-4 py-4">
                            {item.price}
                          </td>
                          <td className="border-r-1 border-gray-200 px-4 py-4">
                            {item.quantity * item.price}
                          </td>
                          <td className="border-r-1 border-gray-200 px-4 py-4">
                            {item.discount || "-"}
                          </td>
                          <td className="border-r-0 border-gray-200 px-4 py-4 flex justify-center">
                            <div>
                              <img
                                src={InfoIcon}
                                alt="info"
                                className="cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div>
              <div className="mt-4 w-full p-5 bg-white rounded-xl">
                {/* Totals */}
                <div>
                  <div className="flex justify-between">
                    <div className="w-full space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span>${discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (0%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-end mt-6">
                      <div className="flex gap-4">
                        <button className="w-[100px] py-7 text-[#b60000] rounded-xl outline-2 flex flex-col justify-center items-center cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="40px"
                            viewBox="0 -960 960 960"
                            width="40px"
                            fill="#b60000"
                          >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                          <p>Delete</p>
                        </button>

                        <button className="w-[125px] py-7 rounded-xl bg-black text-white flex flex-col justify-center items-center cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="40px"
                            viewBox="0 -960 960 960"
                            width="40px"
                            fill="#FFFFFF"
                          >
                            <path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z" />
                          </svg>
                          <p>Print</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
