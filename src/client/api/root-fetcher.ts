const fetcher = (url) =>
  fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/${url}`).then((r) => r.json());

export default fetcher;
