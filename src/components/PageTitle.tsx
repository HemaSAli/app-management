import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './ui/Button/button';

const PageTitle = ({ title, backButton = false }: { title: string; backButton?: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      {backButton && (
        <Button onClick={() => navigate(-1)} size="icon" variant="link">
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      )}
      <p className="text-xl lg:text-2xl text-center font-bold">{title}</p>
    </div>
  );
};

export default PageTitle;
