import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Button from '../ui/Button/button';
import { Skeleton } from '../ui/skeleton';
import AvatarPlaceholder from './AvatarPlaceholder.svg';
import { useUploadPhoto } from './hooks';

const PatientPhoto = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { watch, setValue } = useFormContext();
  const photo = watch('photo');

  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  const uploadPhoto = useUploadPhoto();
  const handleRemove = async () => {
    setValue('photo', '');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const newBlob = await uploadPhoto(file);
        setValue('photo', newBlob.data.url);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex gap-4">
      <Avatar className="w-15 h-15">
        <AvatarImage src={photo || AvatarPlaceholder} />
        <AvatarFallback>
          <Skeleton className="w-15 h-15" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">Profile Picture</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleUpload} disabled={isUploading}>
            <p className="leading-none">Upload</p>
          </Button>
          {photo && (
            <Button variant="destructive" size="sm" onClick={handleRemove} disabled={isUploading}>
              <p className="leading-none">Remove</p>
            </Button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default PatientPhoto;
