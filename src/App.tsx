import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cancel from './pages/Cancel';
import Home from './pages/Home';
import StripeSuccess from './pages/StripeSuccess';
import BotSuccess from './pages/BotSuccess';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/success/payment" element={<StripeSuccess />} />
        <Route path="/success/bot" element={<BotSuccess />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;