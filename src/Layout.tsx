import Card from '@/components/ui/Card';
import { Outlet } from 'react-router';
import { Toaster } from './components/ui/sonner';

const Layout = () => {
  return (
    <div className="flex justify-center items-center p-6 lg:p-0 h-dvh">
      <Card className="w-full max-w-2xl max-h-[calc(100dvh-100px)] overflow-y-auto">
        <Outlet />
      </Card>
      <Toaster />
    </div>
  );
};

export default Layout;
