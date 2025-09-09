import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import usersIcon from "../assets/user-group.svg";
import billIcon from "../assets/receipt.svg";
import storeIcon from "../assets/store.svg";
import paymentIcon from "../assets/credit-card.svg";
import settingIcon from "../assets/settings.svg";
import logoutIcon from "../assets/logout.svg";
import logo from "/icon-bg.png";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/dashboard");

  const sideBar = [
    { name: "Home", img: homeIcon, to: "", admin: false },
    { name: "Bill", img: billIcon, to: "/bill", admin: false },
    { name: "Store", img: storeIcon, to: "/store", admin: false },
    { name: "Payment", img: paymentIcon, to: "/payment", admin: true },
    { name: "User", img: usersIcon, to: "/users", admin: true },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] ">
      <div className="fixed top-0 left-0 w-full bg-[#f5f5f5] z-20 p-4 ">
        <h1 className="font-bold text-2xl text-center">OnePos</h1>
        <div className="w-full h-0.5 my-2 bg-neutral-200"></div>
      </div>

      <div className="flex pt-[80px]">
        <div className="fixed top-[80px] left-0 h-[calc(100vh-100px)] w-20 bg-white rounded-tr-2xl rounded-br-2xl px-2 py-4 z-10">
          <div className="flex flex-col h-full items-center justify-between">
            <div>
              <img src={logo} alt="home" className="w-12" />
            </div>
            <div className="flex flex-col gap-4">
              {user?.role === "admin"
                ? sideBar.map((point, index: number) =>
                    pathname[1] == point.to ? (
                      <Link key={index} to={`/dashboard${point.to}`}>
                        <img
                          src={point.img}
                          alt={point.name}
                          className="w-10 rounded-full p-2 bg-sky-300"
                        />
                      </Link>
                    ) : (
                      <Link key={index} to={`/dashboard${point.to}`}>
                        <img
                          src={point.img}
                          alt={point.name}
                          className="w-10 rounded-full p-2 hover:bg-sky-200 transition"
                        />
                      </Link>
                    )
                  )
                : sideBar.map(
                    (point, index: number) =>
                      point.admin === false &&
                      (pathname[1] == point.to ? (
                        <Link key={index} to={`/dashboard${point.to}`}>
                          <img
                            src={point.img}
                            alt={point.name}
                            className="w-10 rounded-full p-2 bg-sky-300"
                          />
                        </Link>
                      ) : (
                        <Link key={index} to={`/dashboard${point.to}`}>
                          <img
                            src={point.img}
                            alt={point.name}
                            className="w-10 rounded-full p-2 hover:bg-sky-200 transition"
                          />
                        </Link>
                      ))
                  )}
            </div>
            <div className="flex flex-col gap-4">
              {pathname[1] == "/users/me" ? (
                <Link to={`/dashboard/settings`}>
                  <img
                    src={settingIcon}
                    alt="Settings"
                    className="w-10 rounded-full p-2 bg-sky-300"
                  />
                </Link>
              ) : (
                <Link to={`/dashboard/users/me`}>
                  <img
                    src={settingIcon}
                    alt="Settings"
                    className="w-10 rounded-full p-2 hover:bg-sky-200 transition"
                  />
                </Link>
              )}
              <button onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  alt="logout"
                  className="w-10 rounded-full p-2 hover:bg-red-200 transition"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="ml-24 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
