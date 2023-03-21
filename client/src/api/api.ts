import { HeroDataModel } from '../models/hero';
import { SkillDataModel } from '../models/skill';

async function makeServerCall<T>(
  method: 'GET' | 'POST' | 'UPDATE' | 'DELETE',
  url: string,
  {
    cache = false,
    body = {},
    base = process.env.REACT_APP_API_URL as string || '',
  }: {
    cache?: boolean;
    body?: Record<string, unknown> | unknown[];
    base?: string;
  } = {},
): Promise<T> {
  // Request Body
  const jsonBody = JSON.stringify(body);

  // Request Headers
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Content-Length', `${jsonBody.length}`);

  if (cache) {
    headers.set('Cache-Control', 'no-cache, max-age=2628000');
  }

  // Send Request
  const response = await fetch(`${base}${url}`, {
    method,
    headers,
    body: method === 'GET' ? null : jsonBody,
  });

  return response.json();
}

const api = {
  getHomepageData: async () => makeServerCall<{ heroID: number }>('GET', '/api/home'),
  getGameData: async () => makeServerCall<
  {
    heroList: HeroDataModel[],
    skillList: SkillDataModel[],
    resplendentList: string[],
    sealList: string[]
  }
  >('GET', '/api/data', { cache: true }),
};

export default api;
