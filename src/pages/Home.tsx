import Hero from '../components/sections/Hero';
import AboutBrief from '../components/sections/AboutBrief';
import Dashboard from '../components/sections/Dashboard';
import CampaignsBrief from '../components/sections/CampaignsBrief';
import CommunityVoices from '../components/sections/CommunityVoices';
import Volunteer from '../components/sections/Volunteer';
import NewsletterSubscribe from '../components/sections/NewsletterSubscribe';
import StayInformed from '../components/sections/StayInformed';

export default function Home() {
  return (
    <div className="bg-primary">
      <Hero />
      <AboutBrief />
      <Dashboard />
      <CampaignsBrief />
      <CommunityVoices />
      <Volunteer />
      <StayInformed />
      <NewsletterSubscribe />
    </div>
  );
}
