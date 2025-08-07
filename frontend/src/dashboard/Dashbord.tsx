export default function Dashboard() {
  return (
    <>
      <div className="bg-[#f5f5f5] min-h-screen p-4">
        <h1 className="font-bold text-2xl text-center">OnePos</h1>
        <div className="w-full h-0.5 my-2 mb-4 bg-neutral-200"></div>
        <div className="flex flex-col bg-white items-center justify-center gap-3 w-32 h-32 rounded-lg p-4 text-center cursor-pointer">
          <span className="font-bold text-5xl">+</span>
          Create Bill
        </div>
      </div>
    </>
  );
}
