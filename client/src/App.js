
import './App.css';
import { Routes, Route} from "react-router-dom";
import HomeViews from './views/HomeViews';
import LoginViews from './views/LoginViews';
import DetailsViews from './views/DetailsView';
import CheckoutViews from './views/CheckoutViews';
import ReportViews from './views/ReportViews';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeViews />} />
        <Route path="/login" element={<LoginViews />} />
        <Route path="/details/:id" element={<DetailsViews />} />
        <Route path="/checkout/:id" element={<CheckoutViews />} />
        <Route path="/reports" element={<ReportViews />} />
      </Routes>
    </div>
  );
}

export default App;
