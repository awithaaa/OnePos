import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
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
              <input className="block w-80 rounded-4xl bg-white px-3.5 py-3 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900" />
            </div>

            <div className="mt-10">
              <button
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
    </>
  );
}
