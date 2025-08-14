import { useEffect, useState } from "react";
import AddItemDialogBox from "../../components/Dialog/Add-Item-Dialog";
import { api } from "../../services/api";
import Table from "../../components/Table";

export default function Store() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isItems, setItems] = useState<any[]>();
  const [isStart, setStart] = useState<number>(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get(`/items?start=${isStart - 1}&size=9`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [isStart]);

  const handlePrevious = () => {
    setStart(isStart - 9);
  };

  const handleNext = () => {
    setStart(isStart + 9);
    console.log(isStart);
  };

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

          <div className="mt-4">
            {isItems && <Table data={isItems} />}

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-white text-black font-medium rounded-xl hover:bg-black hover:text-white outline-2  transition cursor-pointer"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-black text-white font-medium rounded-xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
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
