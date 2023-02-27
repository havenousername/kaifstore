export default (url: string, ms: number, options: RequestInit) => {
  const controller = new AbortController();

  const promise = fetch(url, { signal: controller.signal, ...options });

  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};
