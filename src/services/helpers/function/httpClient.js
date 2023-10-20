import server from '../../configs';

const { SERVER_API } = server;

export default class HttpClient {
  constructor(serverApi = SERVER_API) {
    this.serverApi = serverApi;
  }

  /**
   * @async
   * @function callApi
   * @param {string} url - The endpoint to call.
   * @param {string} method - The HTTP method to use.
   * @param {object} params - The query parameters to include in the request.
   * @param {object} body - The body of the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  async callApi(url, method, params = {}, body = {}, token = null) {
    url = this.serverApi + url;
    if (Object.keys(params).length) {
      url = url + '?' + new URLSearchParams(params).toString();
    }
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
    if (Object.keys(body).length) {
      options.body = JSON.stringify(body);
    }
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        return {
          res,
          data,
        };
      } else {
        return {
          res,
          data: { message: data.message, data: {} },
        };
      }
    } catch (e) {
      if (e.name === 'TypeError') {
        setTimeout(() => window.location.reload(), 500);
      }
      return;
    }
  }

  /**
   * @function get
   * @param {string} url - The endpoint to call.
   * @param {object} params - The query parameters to include in the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  get(url, params = {}, token = null) {
    return this.callApi(url, 'GET', params, {}, token);
  }

  /**
   * @function post
   * @param {string} url - The endpoint to call.
   * @param {object} body - The body of the request.
   * @param {object} params - The query parameters to include in the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  post(url, body, params = {}, token = null) {
    return this.callApi(url, 'POST', params, body, token);
  }

  /**
   * @function put
   * @param {string} url - The endpoint to call.
   * @param {object} body - The body of the request.
   * @param {object} params - The query parameters to include in the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  put(url, body, params = {}, token = null) {
    return this.callApi(url, 'PUT', params, body, token);
  }

  /**
   * @function patch
   * @param {string} url - The endpoint to call.
   * @param {object} body - The body of the request.
   * @param {object} params - The query parameters to include in the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  patch(url, body, params = {}, token = null) {
    return this.callApi(url, 'PATCH', params, body, token);
  }

  /**
   * @function delete
   * @param {string} url - The endpoint to call.
   * @param {object} params - The query parameters to include in the request.
   * @param {string} token - The authorization token.
   * @returns {Promise<object>} The response from the server.
   */
  delete(url, params = {}, token = null) {
    return this.callApi(url, 'DELETE', params, {}, token);
  }
}
