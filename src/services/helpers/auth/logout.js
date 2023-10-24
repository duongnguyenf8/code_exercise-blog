import server from '@/services/configs';
import HttpClient from '../function/httpClient';
const { SERVER_API, endpoint } = server;
const client = new HttpClient(SERVER_API);
/**
 * A function to logout a user.
 * @param {string} [accessToken] - The user's access token. If not provided, the function will try to retrieve the access token from local storage.
 * @returns {{ res: Response, message?: string }} The response and message from the API.
 */
export default async function logout(
  accessToken = JSON.parse(localStorage.getItem('userData')).accessToken
) {
  const { res, data } = await client.post(endpoint.logout, {}, '', accessToken);

  const { message } = data;
  return { res, message };
}
