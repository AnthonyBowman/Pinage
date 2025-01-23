// src/routes.ts
import { BarChart2, Monitor, Film, List, MapPin, Calendar, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Assets from './pages/Assets';
import Playlists from './pages/Playlists';
import Locations from './pages/Locations';
import Schedules from './pages/Schedules';
import Settings from './pages/Settings';

export interface Route {
  path: string;
  name: string;
  component: React.ComponentType;
  icon: React.ComponentType;
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    icon: BarChart2
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices,
    icon: Monitor
  },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets,
    icon: Film
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists,
    icon: List
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations,
    icon: MapPin
  },
  {
    path: '/schedules',
    name: 'Schedules',
    component: Schedules,
    icon: Calendar
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    icon: SettingsIcon
  }
];