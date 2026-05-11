import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import { AuthProvider } from './lib/auth';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Campaigns from './pages/Campaigns';
import Newsletters from './pages/Newsletters';
import Donate from './pages/Donate';
import Login from './pages/Login';
import PublicComments from './pages/PublicComments';
import VolunteerForm from './pages/VolunteerForm';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/news-letters" element={<Newsletters />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comments" element={<PublicComments />} />
            <Route path="/public-comments" element={<PublicComments />} />
            <Route path="/volunteer-form" element={<VolunteerForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
