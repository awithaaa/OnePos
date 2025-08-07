import { useState } from "react";
import Dashboard from "./dashboard/Dashbord";
import Login from "./auth/Login";

function App() {
  const [isAuthenticated, setAuthenticated] = useState<boolean>();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <Dashboard />;
}

export default App;
