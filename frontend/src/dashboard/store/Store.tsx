import { useState } from "react";
import AddItemDialogBox from "../../components/Dialog/Add-Item-Dialog";

export default function Store() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
      <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-4 pb-4">
        <div
          className="flex flex-col bg-white items-center justify-center gap-3 w-32 h-32 rounded-lg p-4 text-center cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <span className="font-bold text-5xl">+</span>
          Add Item
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
