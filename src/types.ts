import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  impactGoal: string;
  icon: LucideIcon;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface ChartData {
  name: string;
  value: number;
  label?: string;
}
