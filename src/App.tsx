import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/Dashboard";
import StockDashboard from "./pages/StockDashboard";
import Error from "./components/ErrorComponent/index";
import { Navigate } from "react-router-dom";

function App() {
  const [userToken, setUserToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    setUserToken(sessionStorage.getItem("token"));
  }, [sessionStorage]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              {userToken ? (
                <Dashboard />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )}
            </>
          }
        />
        <Route
          path="/stock/:stockId"
          element={
            <>
              {userToken ? (
                <StockDashboard />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )}
            </>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
