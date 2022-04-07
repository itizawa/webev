import { useState } from 'react';
import { Directory } from '@monorepo/client/src/domains/Directory';
import { restClient } from '@monorepo/client/src/utils/rest-client';

export const useCreateDirectory = (): { isLoading: boolean; createDirectory: (name: string) => Promise<Directory> } => {
  const [isLoading, setIsLoading] = useState(false);

  const createDirectory = async (name: string): Promise<Directory> => {
    setIsLoading(true);
    const { data } = await restClient.apiPost<Directory>('/directories', { name });
    setIsLoading(false);
    return data;
  };

  return { isLoading, createDirectory };
};
