import { useCookies } from 'react-cookie';
import { useCallback, useEffect, useState } from 'react';
import { HttpStatus } from '@nestjs/common';
import { ContentType, DataFetched, FetchParams } from '../interfaces/fetches';

export default function useFetch<Res>({
  baseUrl,
  type,
  path,
  params = [],
  contentType = ContentType.JSON,
  body,
  query = [],
  timeout,
}: FetchParams): [Res | null, boolean, string | null, Response | null] {
  const [res, setRes] = useState<
    DataFetched<{
      res: Res;
    }>
  >({
    data: null,
    loading: false,
    error: null,
    response: null,
  });
  const [xsrfToken] = useCookies(['XSRF-TOKEN']);

  const fetchCall = useCallback(() => {
    const apiPath =
      `${baseUrl}/${path}` +
      params.reduce((prev, param) => prev + `/${param}`, '') +
      (query.length > 0
        ? query.reduce(
            (prev, [key, value], ind) =>
              prev + `${ind > 0 ? '&' : '?'}${key}=${value}`,
            '',
          )
        : '');
    const headers: any = {
      'CSRF-Token': xsrfToken['XSRF-Token'],
    };
    if (contentType === ContentType.JSON) {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    } else if (contentType === ContentType.FORM_DATA) {
      headers.enctype = 'multipart/form-data';
    }
    setRes((prev) => ({ ...prev, loading: true }));
    fetch(apiPath, {
      method: type,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(async (result) => {
        if (result.status === HttpStatus.NOT_FOUND) {
          const json = await result.json();
          setRes((prevRes) => ({ ...prevRes, error: json }));
          return;
        }
        const json = await result.json();
        setRes((prevRes) => ({
          ...prevRes,
          data: json,
          response: result,
        }));
      })
      .catch((e) => {
        setRes((prevRes) => ({ ...prevRes, error: e }));
      })
      .finally(() => {
        setRes((prevRes) => ({ ...prevRes, loading: false }));
      });
  }, [baseUrl, body, contentType, params, path, query, type, xsrfToken]);

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        fetchCall();
      }, timeout);
    } else {
      fetchCall();
    }
  }, [body, contentType, fetchCall, timeout, type, xsrfToken]);

  return [res.data?.res ?? null, res.loading, res.error, res.response];
}
