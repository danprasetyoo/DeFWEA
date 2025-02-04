import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationItem from "./pages/NavigationItem";
import CalculatorInput from "./components/Feature/Calculator/CalculatorInput/CalculatorInput";


function App() {
  return (
    <Router>
      <div className="flex">
        <NavigationItem />
        <div className="flex-1 p-6 ml-64 mt-16">
          <Routes>
            <Route path="/calculators" element={<CalculatorInput />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
