export enum RequestType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum ContentType {
  JSON,
  FORM_DATA,
}

export type DataFetched<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  response: Response | null;
};

export type FetchParams = {
  baseUrl: string;
  type: RequestType;
  path: string;
  params?: string[];
  contentType?: ContentType;
  body?: Record<string, any>;
  query?: [string, any][];
  timeout?: number;
};
