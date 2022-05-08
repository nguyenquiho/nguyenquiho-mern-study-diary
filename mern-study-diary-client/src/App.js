// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/layouts/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard"
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Auth authRoute="login" />} />
          <Route
            exact
            path="/register"
            element={<Auth authRoute="register" />}
          />
          <Route
            exact
            path="/dashboard"
            element={Dashboard}
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
