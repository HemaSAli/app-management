import { cn } from '@/lib/utils';
import React from 'react';

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-4 lg:p-6 shadow-sm w-full',
        className
      )}
    >
      {props.children}
    </div>
  );
};

export default Card;
