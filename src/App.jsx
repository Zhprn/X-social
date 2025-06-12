import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Suggest from "./components/Suggest";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="d-flex bg-black">
        <div>
          <Sidebar />
        </div>

        <div className="flex-grow-1 p-3 bg-black">
          <Routes>  
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Suggest />
        </div>
      </div>
    </Router>
  );
}

export default App;
