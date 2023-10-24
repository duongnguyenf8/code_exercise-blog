import HttpClient from '@/services/helpers/function/httpClient';
import server from '@/services/configs';
const { SERVER_API, endpoint } = server;
export default async function postBlog(
  blog = { title: '', content: '' },
  token = ''
) {
  const client = new HttpClient(SERVER_API);
  const { res, data: result } = await client.post(
    endpoint.blogs,
    blog,
    '',
    token
  );
  const { data, message } = result;
  if (!data && message) {
    return { res, message };
  } else {
    return { res, data };
  }
}
