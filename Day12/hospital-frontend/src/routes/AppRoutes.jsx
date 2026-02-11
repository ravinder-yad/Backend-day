import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
