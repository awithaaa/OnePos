import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./dashboard/Dashbord";
import Login from "./auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
