import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard/Dashbord";
import Login from "./auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./dashboard/layout";
import Users from "./dashboard/users/Users";
import NotFound from "./Not-found";
import Store from "./dashboard/store/Store";
import ItemDetail from "./dashboard/store/item/Item";
import InventoryDetail from "./dashboard/store/inventory/Inventory";
import CreateBill from "./dashboard/bill/create/Create";
import Bill from "./dashboard/bill/Bill";
import UserDetail from "./dashboard/users/User";
import BillEdit from "./dashboard/bill/Bill-Edit";
import PrintBill from "./dashboard/bill/Print-Bill";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="print-bill/:id"
            element={
              <ProtectedRoute>
                <PrintBill />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bill" element={<Bill />} />
            <Route path="bill/create" element={<CreateBill />} />
            <Route path="bill/:id" element={<BillEdit />} />
            <Route path="store" element={<Store />} />
            <Route path="store/item/:id" element={<ItemDetail />} />
            <Route path="store/inventory/:id" element={<InventoryDetail />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            {/* <Route path="bill" element={<Bill />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
