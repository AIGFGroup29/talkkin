import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import ChoosePlanPage from './pages/ChoosePlan';
import BasicPlanOnboarding from './pages/BasicPlanOnboarding';
import BasicPlanDashboard from './pages/BasicPlanDashboard';
import PremiumPlanOnboarding from './pages/PremiumPlanOnboarding';
import PremiumPlanDashboard from './pages/PremiumPlanDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose-plan" element={<ChoosePlanPage />} />
        <Route path="/onboarding/basic" element={<BasicPlanOnboarding />} />
        <Route path="/onboarding/premium" element={<PremiumPlanOnboarding />} />
        <Route path="/dashboard/basic" element={<BasicPlanDashboard />} />
        <Route path="/dashboard/premium" element={<PremiumPlanDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
