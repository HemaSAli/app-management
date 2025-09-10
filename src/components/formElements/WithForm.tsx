import React from 'react';
import { useFormContext, type UseFormReturn } from 'react-hook-form';

const WithForm = ({ children }: { children: (methods: UseFormReturn) => React.ReactNode }) => {
  const methods = useFormContext();
  return children(methods);
};

export default WithForm;
