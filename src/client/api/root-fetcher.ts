const fetcher = (baseUrl) => (url) =>
  fetch(`${baseUrl}/${url}`).then((r) => r.json());

export default fetcher;
