import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DialogBox from "../components/DialogBox";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("avwithanage2006@gmail.com");
  const [password, setPassword] = useState("");

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error: any) {
      newAlert(
        "Login error",
        error?.response?.data?.message || error.message || "Login failed",
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
          <h1 className="text-center font-bold text-3xl">Login</h1>
          <div className="flex flex-col items-center mt-3">
            <div className="w-30 h-6 py-0.5 text-sm rounded-4xl bg-black text-white text-center cursor-pointer">
              <p>arosha</p>
            </div>

            <div className="mt-10 flex flex-col gap-1">
              <label className="ml-4">Password /Pin</label>
              <input
                className="block w-80 rounded-4xl bg-white px-3.5 py-3 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={handleLogin}
                className="w-64 py-3 bg-black text-white rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
              >
                Login
              </button>
              <p className="mt-2 text-sm text-center text-blue-500 cursor-pointer">
                Forgot Password ?
              </p>
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
