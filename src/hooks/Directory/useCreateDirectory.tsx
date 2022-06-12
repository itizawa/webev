import { useState } from 'react';
// import { restClient } from '~/utils/rest-client';

export const useCreateDirectory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createDirectory = async (): Promise<void> => {
    setIsLoading(true);
    // const { data } = await restClient.apiPost<Directory>('/directories', { name });
    // setIsLoading(false);
    // return data;
  };

  return { isLoading, createDirectory };
};
