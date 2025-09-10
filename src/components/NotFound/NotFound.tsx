import links from '@/links';
import { useNavigate } from 'react-router';
import Button from '../ui/Button/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4 leading-none">404</h1>
      <h2 className="text-2xl text-gray-600 mb-6">Page Not Found</h2>
      <p className="text-base text-gray-600 mb-6 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-2">
        <Button onClick={() => navigate(-1)} variant="outline" className="mr-4">
          Go Back
        </Button>
        <Button onClick={() => navigate(links.patients())} variant="default">
          Go to Patients
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
