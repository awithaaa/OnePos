import { useEffect, useState } from "react";
import AddItemDialogBox from "../../components/Dialog/Add-Item-Dialog";
import { api } from "../../services/api";

export default function Store() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isItems, setItems] = useState<any[]>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);
  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-4 mt-1">
        <div>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Item List</h1>
            <div
              className="flex items-center justify-center px-6 py-1.5 rounded-lg p-4 text-center font-medium cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2 transition"
              onClick={() => setDialogOpen(true)}
            >
              Add Item
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full h-10 bg-black rounded-t-lg"></div>
          </div>

          {isItems?.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </div>

      <div>
        <AddItemDialogBox
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        ></AddItemDialogBox>
      </div>
    </>
  );
}
