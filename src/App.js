import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserProfileFeature from "./components/UserProfileFeature";  // Correct path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [income, setIncome] = useState(5000);
  const [expense, setExpense] = useState(4000);

  // Function to reset balance, income, and expenses
  const handleResetBalance = () => {
    setCurrentBalance(0);
    setIncome(0);
    setExpense(0);
  };

  // Function to handle theme color change
  const handleColorChange = (colors) => {
    Object.entries(colors).forEach(([variable, color]) => {
      document.documentElement.style.setProperty(variable, color);
    });
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Header />
        <Routes>
          {/* Route for the Signup page */}
          <Route path="/" element={<Signup />} />

          {/* Route for the Dashboard page */}
          <Route
            path="/dashboard"
            element={
              <Dashboard
                currentBalance={currentBalance}
                income={income}
                expense={expense}
                onResetBalance={handleResetBalance} // Pass reset function to Dashboard
              />
            }
          />

          {/* Route for the User Profile page */}
          <Route
            path="/profile"
            element={<UserProfileFeature handleColorChange={handleColorChange} />} // Pass handleColorChange to UserProfileFeature
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;