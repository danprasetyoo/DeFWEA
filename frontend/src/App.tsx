import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationItem from "./pages/NavigationItem";
// import SidebarMenu from "./SidebarMenu";
// import Dashboard from "./Dashboard";
import CalculatorInput from "./components/Feature/Calculator/CalculatorInput";
// import Claim from "./Claim";
// import Tbill from "./Tbill";
// import Report from "./Report";

function App() {
  return (
    <Router>
      <div className="flex">
        <NavigationItem />
        <div className="flex-1 p-6 ml-64 mt-16">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/calculator" element={<CalculatorInput />} />
            {/* <Route path="/claim" element={<Claim />} /> */}
            {/* <Route path="/tbill" element={<Tbill />} /> */}
            {/* <Route path="/report" element={<Report />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
