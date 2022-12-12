import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explorepage from "./Components/Explorepage";
import Homepage from "./Components/Homepage";
import Findpage from "./Components/Findpage";
import Login from "./Components/Login";
import Main from "./Components/Main";
import SignUp from "./Components/Signuppage";
import "./Components/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/explore" element={<Explorepage />} />
              <Route path="/find" element={<Findpage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
