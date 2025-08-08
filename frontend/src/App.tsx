import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./dashboard/Dashbord";
import Login from "./auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./dashboard/layout";
import Users from "./dashboard/users/Users";

function App() {
  const [isAuthenticated, setAuthenticated] = useState<boolean>();

  return (
    <AuthProvider>
      <Router>
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
            <Route path="users" element={<Users />} />
            {/* <Route path="bill" element={<Bill />} /> */}
          </Route>
          <Route path="*" element={<Link to={"/dashboard"}>Redirect</Link>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
