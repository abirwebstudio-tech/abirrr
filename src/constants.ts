import { Home, Info, Heart, Newspaper, HelpCircle, LayoutDashboard, MessageSquare } from 'lucide-react';
import { ImpactStat, Campaign, Testimonial } from './types';

export const NAV_LINKS = [
  { label: 'Base', href: '/' },
  { label: 'Mission', href: '/campaigns' },
  { label: 'Archive', href: '/newsletters' },
  { label: 'Voices', href: '/comments' },
  { label: 'About', href: '/about' },
];

export const IMPACT_STATS: ImpactStat[] = [
  { label: 'Lives Impacted', value: '50k+', icon: Heart },
  { label: 'Countries Served', value: '12', icon: Info },
  { label: 'Donation Impact', value: '94%', icon: LayoutDashboard },
  { label: 'Expert Volunteers', value: '250', icon: MessageSquare },
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'edu-all',
    title: 'Education for All',
    description: 'Providing school kits and tuition support to children in rural areas.',
    impactGoal: 'Target: 5,000 Students',
    icon: Newspaper,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80',
  },
  {
    id: 'clean-water',
    title: 'Clean Water Initiative',
    description: 'Installing deep tube wells to provide safe drinking water.',
    impactGoal: 'Target: 100 Communities',
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80',
  },
];
