import { AxiosRequestConfig, Method } from 'axios';
import { z } from 'zod';
import { instance, instanceWithoutInterceptors } from '@/lib/axios';

interface APICallPayload<Request, Response> {
  method: Method;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
  type?: 'private' | 'public';
}

export function api<Request, Response>({
  type = 'private',
  method,
  path,
  requestSchema,
  responseSchema,
}: APICallPayload<Request, Response>) {
  return async (requestData?: {
    data?: Request;
    query?: string;
    params?: Record<string, number | string | undefined>;
  }) => {
    // Validate request data
    requestSchema.parse(requestData?.data);

    // Prepare API call
    let url = path;
    let data = null;
    let params = null;

    if (requestData) {
      if (requestData.query) {
        url += `${requestData.query}`;
      }
      if (requestData.data) {
        data = requestData.data;
      }
      if (requestData.params) {
        params = requestData.params;
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      params,
      data,
    };

    // Make API call base on the type of request
    const response =
      type === 'private' ? await instance(config) : await instanceWithoutInterceptors(config);

    // Parse and validate response data
    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error('🚨 Safe-Parsing Failed ', result.error);
      throw new Error(result.error.message);
    } else {
      return result.data;
    }
  };
}
