import { Domains, GenshinServer } from '../interfaces';

async function makeServerCall<T>(
  method: string,
  url: string,
  body?: any,
  base: string = process.env.REACT_APP_API_URL as string,
  cache: boolean = false,
): Promise<T> {
  const jsonBody = JSON.stringify(body);
  const response = await fetch(`${base}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': `${jsonBody.length}`,
      'Cache-Control': cache ? 'max-age=604800' : 'no-cache',
    },
    body: jsonBody,
  });

  return response.json();
}

const api = {
  getHomepageData: async (server: GenshinServer) => makeServerCall<{ domains: Domains }>('GET', `/api/home?lang=english&server=${server}`),
};

export default api;
