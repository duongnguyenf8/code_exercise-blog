import server from '@/services/configs';
import HttpClient from './httpClient';
const { SERVER_API, endpoint } = server;
/**
 * A function to login a user.
 * @param {{ email: string, password: string }} credentials - The user's credentials.
 * @returns {{ res: Response, data?: object, message?: string }} The response and data from the API.
 */
export default async function login({ email, password }) {
  const client = new HttpClient(SERVER_API);
  const body = {
    email,
    password,
  };
  const { res, data: result } = await client.post(endpoint.login, body);
  const { data, message } = result;
  if (!data && message) {
    return { res, message };
  } else {
    localStorage.setItem('userData', JSON.stringify(data));
    return { res, data };
  }
}
