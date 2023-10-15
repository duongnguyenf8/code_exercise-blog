import server from '../configs';
import HttpClient from './httpClient';
const { SERVER_API, endpoint: path } = server;
/**
 * Get data from the server
 * @param {string} endpoint - endpoint to fetch data from
 * @returns {object} - object containing the response and the data
 */
export default async function getData(endpoint = 'blogs', params = {}, token) {
  const client = new HttpClient(SERVER_API);
  const { data, res } = await client.get(path[endpoint], params, token);
  try {
    return { res, data: data.data };
  } catch (error) {
    return { res, data: [] };
  }
}
