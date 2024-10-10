import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { setAmplitudeUserProperties } from '@/amplitude';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { ProfileAPIRequestSchema, ProfileAPIResponseSchema } from './schema';

const ProfileAPIRequest = ProfileAPIRequestSchema;

const ProfileAPIResponse = ProfileAPIResponseSchema;

const getProfile = api<z.infer<typeof ProfileAPIRequest>, z.infer<typeof ProfileAPIResponse>>({
  method: 'GET',
  path: Endpoints.PROFILE,
  requestSchema: ProfileAPIRequest,
  responseSchema: ProfileAPIResponse,
  type: 'private',
});

export function useProfile() {
  return useQuery<z.infer<typeof ProfileAPIResponseSchema>, AxiosError<string>>({
    queryKey: ['profile', 'info'],
    queryFn: async () => {
      const data = await getProfile();
      setAmplitudeUserProperties({ nickname: data.nickname });
      return data;
    },
  });
}
