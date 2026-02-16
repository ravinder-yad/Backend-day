import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
