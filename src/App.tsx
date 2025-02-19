import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Home from './pages/Home';
import StripeSuccess from './pages/StripeSuccess';
import BotSuccess from './pages/BotSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success/payment" element={<StripeSuccess />} />
        <Route path="/success/bot" element={<BotSuccess />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;