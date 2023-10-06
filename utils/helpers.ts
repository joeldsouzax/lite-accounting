export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';

  url = url.includes('http') ? url : `http://${url}`;
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const getDelay = (i: number, size: number, pageSize: number) =>
  i >= pageSize * 2 ? (i - pageSize * (size - 1)) / 15 : i / 15;
