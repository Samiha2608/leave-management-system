import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import UserDashboardPage from './Pages/UserDashboardPage';
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import ApplyLeave from "./Pages/ApplyLeave";
import Confirmation from "./Pages/Confirmation";
import Confirmation1 from "./Pages/Confirmation1";
import ApplyLeave1 from "./Pages/ApplyLeave1";
import SuperAdminDashboardPage from "./Pages/SuperAdminDashboardPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userDashboard" element={<UserDashboardPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        <Route path="/adminDashboard" element={<AdminDashboardPage />} />
        <Route path="/applyLeave" element={<ApplyLeave />} />
        <Route path="/applyLeave1" element={<ApplyLeave1 />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/confirmation1" element={<Confirmation1 />} />
        <Route path="/super-admin" element={<SuperAdminDashboardPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
