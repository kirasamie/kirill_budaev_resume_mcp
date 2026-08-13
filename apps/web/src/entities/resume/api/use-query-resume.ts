import { useQuery } from '@tanstack/react-query';

import { useAxiosInstance } from '@shared/api';

import { resumeQueryKeys } from './constants';
import { fetchResume } from './fetch-resume';

export const useQueryResume = () => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: resumeQueryKeys.all,
    queryFn: () => fetchResume(axios),
  });
};
