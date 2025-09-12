import { Link } from "react-router-dom";
import arrow_left from "../../../assets/arrow_left.svg";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import DialogBox from "../../../components/DialogBox";

export default function MyAccount() {
  const [isUser, setUser] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>();
  const [isChange, setChange] = useState<boolean>();
  const [isChangePass, setChangePass] = useState<boolean>();
  const [isPassword, setPassword] = useState<any>();

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await api.get("/auth/me");
      setUser(await res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setChange(true);
  };

  const handleInputPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setChangePass(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await api.patch(`/auth/me`, {
        firstName: isUser.firstName,
        lastName: isUser.lastName,
      });
      setUser(res.data.user);
      newAlert("Account updated", res.data.message, "success");
      setChange(false);
    } catch (error: any) {
      newAlert(error.response.data.error, error.response.data.message, "error");
    }
  };

  const handlePassword = async () => {
    if (isPassword.newPassword !== isPassword.confirmPassword) {
      newAlert("Password update error", "Password are not match.", "error");
      return;
    }
    try {
      const res = await api.patch(`/auth/change-password`, {
        password: isPassword.password,
        newPassword: isPassword.newPassword,
      });
      newAlert("Account updated", res.data.message, "success");
      setChangePass(false);
    } catch (error: any) {
      newAlert(error.response.data.error, error.response.data.message, "error");
    }
  };

  const newAlert = (title: string, msg: string, type?: any) => {
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  if (isUser) {
    return (
      <>
        <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-8 mt-1">
          <div className="w-full flex gap-2 items-center">
            <Link
              to={`/dashboard`}
              className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
            >
              <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
            </Link>
            <h1 className="text-2xl font-bold">My Account</h1>
          </div>

          <div className="flex justify-center mt-10">
            <div className="bg-white w-[800px] p-6 rounded-xl">
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Personal Information
                </h2>
                <div>
                  <label className="block font-semibold text-base text-gray-900">
                    Email
                  </label>
                  <input
                    className="mt-2 w-90 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="text"
                    value={isUser.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex gap-8 mt-4 ">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-base">First Name</label>
                  <input
                    className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="text"
                    name="firstName"
                    value={isUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-base">Last Name</label>
                  <input
                    className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="text"
                    name="lastName"
                    value={isUser.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <label className="block font-semibold text-base text-gray-900">
                    Role
                  </label>
                  <input
                    className="mt-2 w-90 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="text"
                    value={isUser.role}
                    readOnly
                  />
                </div>
              </div>

              <div className="my-8 w-full h-0.5 bg-neutral-200"></div>

              <div className="flex justify-center">
                {!isChange ? (
                  <button
                    type="button"
                    disabled={true}
                    className="w-64 py-2.5 font-medium rounded-4xl transition cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2
                     disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-64 py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <div className="bg-white w-[800px] p-6 rounded-xl">
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Credientials Information
                </h2>
                <div>
                  <label className="block font-semibold text-base text-gray-900">
                    Current Password
                  </label>
                  <input
                    className="mt-2 w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="password"
                    name="password"
                    value={isPassword?.password}
                    onChange={handleInputPassChange}
                  />
                </div>
              </div>

              <div className="flex gap-8 mt-4 ">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-base">
                    New Password
                  </label>
                  <input
                    className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="password"
                    name="newPassword"
                    value={isPassword?.newPassword}
                    onChange={handleInputPassChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <label className="block font-semibold text-base text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    className="mt-2 w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                    type="password"
                    name="confirmPassword"
                    value={isPassword?.confirmPassword}
                    onChange={handleInputPassChange}
                  />
                </div>
              </div>

              <div className="my-8 w-full h-0.5 bg-neutral-200"></div>

              <div className="flex justify-center">
                {!isChangePass ? (
                  <button
                    type="button"
                    disabled={true}
                    className="w-64 py-2.5 font-medium rounded-4xl transition cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:outline-2
                     disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-64 py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                    onClick={handlePassword}
                  >
                    Update
                  </button>
                )}
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
}
