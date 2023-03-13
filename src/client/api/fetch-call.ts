import { ContentType, FetchParams } from '../interfaces/fetches';

export const fetchCall = async ({
  baseUrl,
  type,
  path,
  params = [],
  contentType = ContentType.JSON,
  body,
  query = [],
}: FetchParams) => {
  const toMatchAfter = document.cookie;
  const myRegexp = /XSRF-Token=(.*)/;
  const match = myRegexp.exec(toMatchAfter);
  const xsrf = match?.[1];
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
  const headers: any = {};
  if (contentType === ContentType.JSON) {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    headers['CSRF-Token'] = xsrf;
  } else if (contentType === ContentType.FORM_DATA) {
    headers.enctype = 'multipart/form-data';
  }
  return await fetch(apiPath, {
    method: type,
    headers: headers,
    body: JSON.stringify(body),
  });
};
