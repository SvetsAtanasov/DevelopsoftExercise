import "bootstrap/dist/css/bootstrap.min.css";
import DeviceTreeDemo from "./components/DeviceTreeDemo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={"app"}>
        <header className={"app-header"}>
          <Routes>
            <Route path={"/"} element={<DeviceTreeDemo />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
