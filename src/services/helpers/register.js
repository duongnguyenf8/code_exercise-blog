import server from '@/services/configs';
import HttpClient from './httpClient';
const { SERVER_API, endpoint } = server;
const client = new HttpClient(SERVER_API);
export default async function register({ email, password, name }) {
  if (email && password && name) {
    const body = {
      email,
      password,
      name,
    };
    const { res, data } = await client.post(endpoint.register, body);
    const { code, message } = data;
    return { res, message, code };
  } else {
    return {
      res: {
        status: 400,
        statusText: 'Bad Request',
      },
      message: 'Email, password and name are required',
    };
  }
}
