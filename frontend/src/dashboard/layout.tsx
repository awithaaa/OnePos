import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] ">
      <div className="fixed top-0 left-0 w-full bg-[#f5f5f5] z-20 p-4 ">
        <h1 className="font-bold text-2xl text-center">OnePos</h1>
        <div className="w-full h-0.5 my-2 bg-neutral-200"></div>
      </div>

      <div className="flex pt-[80px]">
        <div className="fixed top-[80px] left-0 h-[calc(100vh-100px)] w-20 bg-white rounded-tr-2xl rounded-br-2xl px-2 py-4 z-10"></div>

        <div className="ml-24 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
