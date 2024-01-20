import { Outlet } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';

export default function RidesPage() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
