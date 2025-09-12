import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow_left from "../../assets/arrow_left.svg";
import EditIcon from "../../assets/edit.svg";
import { api } from "../../services/api";
import UserDetailBox from "../../components/User-Detail";
import EditUser from "../../components/Edit-User";
import ConfirmationBox from "../../components/Confirmation-Box";
import DialogBox from "../../components/DialogBox";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isUser, setUser] = useState<any>();
  const [isEdit, setEdit] = useState<boolean>();
  const [isPassReq, setPassReq] = useState<any>();
  const [isPinShow, setPinShow] = useState<boolean>(false);
  const [isChange, setChange] = useState<boolean>(false);

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isConfirmation, setConfirmation] = useState<boolean>(false);
  const [isMsg, setMsg] = useState<string>("");
  const [isType, setType] = useState<"success" | "error">("error");
  const [isMsgTitle, setMsgTitle] = useState<string>("");
  const [isButton, setButton] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`/users?id=${id}`);
      setUser(res.data.user);
    };

    const fetchPR = async () => {
      try {
        const res = await api.get(`/users/password-request?id=${id}`);
        setPassReq(res.data);
        const createdDate = new Date(res.data.createdAt);
        // const updatedDate = new Date(res.data.updatedAt);
        setPassReq((prev: any) => ({
          ...prev,
          ["createdDate"]: createdDate.toLocaleDateString(),
        }));
        setPassReq((prev: any) => ({
          ...prev,
          ["createdTime"]: createdDate.toLocaleTimeString(),
        }));
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPR();
    fetchUser();
  }, [isChange]);

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${id}`);
      navigate("/dashboard/users");
    } catch (error: any) {
      newAlert(
        "Failed",
        error.response?.data?.message || "Failed to fetch sale",
        "error"
      );
    } finally {
      setConfirmation(false);
    }
  };

  const handleAcceptReq = async () => {
    try {
      const res = await api.patch(`/auth/forgot-token`, {
        id: isPassReq.id,
      });
      setPassReq(res.data.acceptToken);
      setChange(!isChange);
    } catch (error: any) {
      newAlert(
        "Failed",
        error.response?.data?.message || "Failed to fetch sale",
        "error"
      );
    }
  };

  const newAlert = (title: string, msg: string, type?: any) => {
    setType("error");
    setMsgTitle("");
    setMsg("");
    setType(type);
    setMsgTitle(title);
    setMsg(msg);
    setAlertOpen(true);
  };

  const newConfirmation = (title: string, msg: string, button: string) => {
    setMsgTitle(title);
    setMsg(msg);
    setButton(button);
    setConfirmation(true);
  };

  if (isUser) {
    return (
      <>
        <div className="bg-[#f5f5f5] min-h-[calc(100vh-100px)] px-10 pb-8 mt-1">
          <div className="w-full flex gap-2 items-center">
            <Link
              to={`/dashboard/users`}
              className="flex items-center w-9 rounded-full p-2 bg-gray-200 hover:bg-sky-200 transition"
            >
              <img src={arrow_left} alt="info" className="cursor-pointer w-9" />
            </Link>
            <h1 className="text-2xl font-bold">User Details</h1>
          </div>
          <div className="flex justify-center mt-10">
            <div className="bg-white p-6 rounded-xl">
              {isEdit && (
                <div>
                  <div className="flex justify-between">
                    <div className="text-xl font-bold ">User Edit</div>
                    <button
                      className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={() => setEdit(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-0.5 mt-4 mb-2 bg-neutral-200"></div>
                  <EditUser user={isUser} />
                </div>
              )}

              {!isEdit && (
                <div>
                  <div className="flex justify-end gap-4">
                    <button
                      className="bg-white rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={() => setEdit(true)}
                    >
                      <img src={EditIcon} alt="edit" className="w-5" />
                    </button>
                    <button
                      className="bg-black rounded-full w-8 h-8 border-2 border-black p-1 cursor-pointer"
                      onClick={() =>
                        newConfirmation(
                          "Are you sure?",
                          "This action cannot be undone. All associated data will also be deleted.",
                          "Delete Permanently"
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-0.5 mt-4 mb-2 bg-neutral-200"></div>
                  <UserDetailBox user={isUser} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <div className="w-[592px]">
              <h3 className="font-bold text-lg mb-5">
                Forgot Password Requests
              </h3>

              <div>
                {isPassReq && (
                  <div className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow">
                    <div>
                      <p>{isPassReq.id}</p>
                      <p>
                        Date: {isPassReq.createdDate} Time:{" "}
                        {isPassReq.createdTime}
                      </p>
                    </div>
                    {isPassReq.acceptBy ? (
                      isPinShow ? (
                        <div onClick={() => setPinShow(false)}>
                          Pin:{" "}
                          <span className="font-semibold cursor-pointer">
                            {isPassReq.pin}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="text-neutral-500 underline cursor-pointer"
                          onClick={() => setPinShow(true)}
                        >
                          Show Pin
                        </div>
                      )
                    ) : (
                      <div className="flex gap-4">
                        <button
                          className="rounded-full bg-green-300 p-1.5 cursor-pointer"
                          onClick={handleAcceptReq}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#016630"
                          >
                            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!isPassReq && (
                  <div className="w-full text-center">Not found!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ConfirmationBox
          isOpen={isConfirmation}
          onClose={() => setConfirmation(false)}
          message={isMsg}
          title={isMsgTitle}
          secondButton={isButton}
          sbAction={deleteUser}
        />

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
