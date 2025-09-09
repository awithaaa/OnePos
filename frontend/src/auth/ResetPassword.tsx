import { useState } from "react";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";

export default function ResetPassword() {
  const [confPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");

  const handleConfirm = async () => {
    try {
    } catch (error: any) {
      newAlert(
        "Error",
        error?.response?.data?.message ||
          error.message ||
          "Reset password failed",
        "error"
      );
    }
  };

  const newAlert = (title: string, msg: string, type?: any) => {
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  return (
    <>
      <div className="bg-[#e8eae6] min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white w-[600px] h-[400px] rounded-xl p-4 shadow-lg">
          <h1 className="text-center font-bold text-3xl">Reset Password</h1>
          <div className="flex flex-col items-center mt-3">
            <div className="mt-4 flex flex-col gap-1">
              <label className="ml-4">New Password</label>
              <input
                className="block w-80 rounded-4xl bg-white px-3.5 py-3 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                type="email"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4  flex flex-col gap-1">
              <label className="ml-4">Confirm Password</label>
              <input
                className="block w-80 rounded-4xl bg-white px-3.5 py-3 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                type="password"
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-64 py-3 bg-black text-white rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              >
                Confirm
              </button>
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
