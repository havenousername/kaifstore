import { createContext } from 'react';

export interface BaseUrl {
  baseUrl: string;
}

const sampleBaseUrl: BaseUrl = {
  baseUrl: '',
};

export const BaseUrlContext = createContext<BaseUrl>(sampleBaseUrl);
