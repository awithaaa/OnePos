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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="store" element={<Store />} />
            <Route path="store/item/:id" element={<ItemDetail />} />
            <Route path="store/inventory/:id" element={<InventoryDetail />} />
            <Route path="users" element={<Users />} />
            {/* <Route path="bill" element={<Bill />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
