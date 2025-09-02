import { useNavigate } from "react-router-dom";
import arrow_left from "../../../assets/arrow_left.svg";
import InfoIcon from "../../../assets/arrow_right.svg";
import { useState } from "react";
import AddItemBill from "../../../components/Add-Item-Bill";
import EditItemBill from "../../../components/Edit-Item-Bill";
import PaymentDialogBox from "../../../components/Dialog/Payment-Dialog";
import { api } from "../../../services/api";
import DialogBox from "../../../components/DialogBox";

interface Items {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  discount?: number;
  index?: number;
}

export default function CreateBill() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<string>("");
  const [items, setItems] = useState<Items[]>([]);
  const [isEdit, setEdit] = useState<boolean>();
  const [isEditIndex, setEditIndex] = useState<number>(0);
  const [isEditItem, setEditItem] = useState<Items | null>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isAlertOpenBack, setAlertOpenBack] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");

  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Name", width: "w-1/3" },
    { header: "Qty", width: "w-1/12" },
    { header: "Unit Price", width: "w-1/6" },
    { header: "Total", width: "w-1/6" },
    { header: "Discount", width: "w-1/8" },
    { header: "", width: "w-1/12" },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );
  const discount = items.reduce(
    (sum, item) => sum + (item.discount || 0) * item.qty,
    0
  );
  const tax = subtotal * 0.0;
  const total = subtotal + tax - discount;

  const handlePaymentProcess = () => {
    handleSaveBill(false);
  };

  const handleSaveBill = async (draft: boolean) => {
    if (items.length === 0) {
      newAlert("Error", "Items not found for bill!", "error");
      return;
    }
    let body;
    if (draft) {
      body = {
        total,
        customer,
        draft,
        saleItems: items.map((i) => ({
          itemId: i.id,
          quantity: i.qty,
          price: i.unitPrice,
          discount: i.discount,
        })),
      };
    } else {
      body = {
        total,
        customer,
        saleItems: items.map((i) => ({
          itemId: i.id,
          quantity: i.qty,
          price: i.unitPrice,
          discount: i.discount,
        })),
      };
    }

    try {
      await api.post("/sales", body);
      newAlert("Bill created", "Bill created successfully!", "success");
    } catch (err: any) {
      console.error(err);
      newAlert("Bill created", err.response.data.message, "error");
    }
  };

  const newAlert = (title: string, msg: string, type?: any) => {
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  const handleItem = (item: Items) => {
    setItems([...items, item]);
  };

  const handleEdit = (index: number) => {
    setEdit(true);
    setEditIndex(index);
    setEditItem(items[index]);
  };

  const handleUpdate = (item: Items) => {
    handleReplaceItem(isEditIndex, item);
    setEdit(false);
    setEditIndex(0);
    setEditItem(null);
  };

  const handleEditClose = () => {
    setEdit(false);
    setEditIndex(0);
    setEditItem(null);
  };

  const handleRemove = () => {
    setItems((prev) => {
      const updated = [...prev];
      updated.splice(isEditIndex, 1);
      return updated;
    });
    setEdit(false);
    setEditIndex(0);
    setEditItem(null);
  };

  const handleReplaceItem = (index: number, newItem: Items) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = newItem;
      return updated;
    });
  };

  const handleBackTrue = () => {
    navigate("/dashboard");
    setAlertOpenBack(false);
  };

  const handleBack = () => {
    if (items.length > 0) {
      setType("error");
      setMsgTitle("Are you sure you want to go back?");
      setMsg("Any unsaved changes will be lost.");
      setAlertOpenBack(true);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div className="w-full flex gap-2 items-center">
          <button
            className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
            onClick={handleBack}
          >
            <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
          </button>
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
                        <div onClick={() => handleEdit(index)}>
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
              <div className="w-full p-4 bg-white rounded-b-xl">
                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full md:w-1/3 space-y-2">
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

                <div className="flex justify-end mt-6">
                  <div className="flex gap-4">
                    <button
                      className="w-[125px] py-7 rounded-xl outline-2 flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => handleSaveBill(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#000000"
                      >
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                      </svg>
                      <p>Save as draft</p>
                    </button>

                    <button
                      className="w-[125px] py-7 rounded-xl bg-black text-white flex flex-col justify-center items-center cursor-pointer"
                      onClick={(e) => setDialogOpen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#FFFFFF"
                      >
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                      </svg>
                      <p>Process</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {isEdit && isEditItem && (
              <EditItemBill
                handleUpdated={handleUpdate}
                item={isEditItem}
                handleClose={handleEditClose}
                handleRemove={handleRemove}
              />
            )}
            {!isEdit && <AddItemBill handleItem={handleItem} />}
          </div>
        </div>
      </div>

      <PaymentDialogBox
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onProcess={handlePaymentProcess}
        data={{
          subtotal: subtotal,
          discount: discount,
          tax: tax,
          total: total,
        }}
      />
      <DialogBox
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
        message={isMsg}
        title={isMsgTitle}
        type={isType}
      />
      <DialogBox
        isOpen={isAlertOpenBack}
        onClose={() => setAlertOpenBack(false)}
        message={isMsg}
        title={isMsgTitle}
        type={isType}
        secondButton="Yes, go back"
        sbAction={handleBackTrue}
      />
    </>
  );
}
