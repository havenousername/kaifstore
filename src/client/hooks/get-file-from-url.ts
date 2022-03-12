import useGetHttpUrl from './use-get-http-url';

export function useFilesFromUrl(): (
  urls: [string, string][],
  defaultType?: string,
) => Promise<File[]> {
  const path = useGetHttpUrl();
  return async (urls: [string, string][], defaultType = 'image/jpeg') =>
    await Promise.all(
      urls.map(([url, filename]) =>
        getFileFromUrl(path(url), filename, defaultType),
      ),
    );
}

const getFileFromUrl = async (url: string, name: string, defaultType) => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: response.headers.get('content-type') || defaultType,
  });
};
