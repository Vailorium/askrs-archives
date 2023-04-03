import IHeroBuild from '../interfaces/IHeroBuild';
import { UserProfile } from '../services/UserSlice';

function getCookie(name: string) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

function createHeaders(body: string): Headers {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Content-Length', body.length.toString());

  const csrfToken = getCookie('csrfToken') || '';
  if (csrfToken) {
    headers.set('X-CSRF-TOKEN', csrfToken);
  }

  return headers;
}

async function handleHttpRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options: {
    body?: Record<string, any> | any[];
    base?: string;
  } = {},
): Promise<T> {
  const { body = {}, base = process.env.REACT_APP_API_URL || '' } = options;
  return new Promise<T>((resolve, reject) => {
    const jsonBody = JSON.stringify(body);
    const headers = createHeaders(jsonBody);

    fetch(`${base}${url}`, {
      method,
      headers,
      body: method === 'GET' ? null : jsonBody,
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          return reject(response.status);
        }
        if (response.headers.get('content-type') && response.headers.get('content-type')?.includes('application/json')) {
          return response.json();
        }
        return response.text();
      })
      .then((resBody) => resolve(resBody))
      .catch((err) => reject(err));
  });
}

const api = {
  ping:
    async () => handleHttpRequest<{ message: string }>('GET', '/ping'),
  setupUserSession:
    async (idToken: string) => handleHttpRequest<{ status: string, message: string }>('POST', '/session', { body: { idToken } }),
  destroyUserSession:
    async () => handleHttpRequest('DELETE', '/session'),
  destroyUserSessions:
    async () => handleHttpRequest('DELETE', '/sessions'),
  getUserProfile:
    async () => handleHttpRequest<UserProfile>('GET', '/profile'),
  handlePostRegister:
    async (idToken: string) => handleHttpRequest('POST', '/register', { body: { idToken } }),
  getAllBuildsForHero:
    async (heroIdTag: string) => handleHttpRequest<IHeroBuild[]>('GET', `/builds/by-id-tag/${heroIdTag}`),
  getAllBuildsForUser:
    async (uid: string) => handleHttpRequest<IHeroBuild[]>('GET', `/builds/by-uid/${uid}`),
  getBuildByBuildId:
    async (buildId: string) => handleHttpRequest<IHeroBuild | null>('GET', `/build/${buildId}`),
  createBuild:
    async (buildData: IHeroBuild) => handleHttpRequest<IHeroBuild>('POST', '/build', { body: buildData }),
  updateBuild:
    async (buildId: string, buildData: IHeroBuild) => handleHttpRequest<IHeroBuild>('PUT', `/build/${buildId}`, { body: buildData }),
  deleteBuild:
    async (buildId: string) => handleHttpRequest<IHeroBuild>('DELETE', `/build/${buildId}`),
};

export default api;
