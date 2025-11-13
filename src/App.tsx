import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import BasicPlanOnboarding from './pages/BasicPlanOnboarding';
import BasicPlanDashboard from './pages/BasicPlanDashboard';
import PremiumPlanOnboarding from './pages/PremiumPlanOnboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding/basic" element={<BasicPlanOnboarding />} />
        <Route path="/onboarding/premium" element={<PremiumPlanOnboarding />} />
        <Route path="/dashboard/basic" element={<BasicPlanDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
