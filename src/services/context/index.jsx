import { useLayoutEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Provider } from './Provider';
import getData from '../helpers/getData';
import server, { PER_PAGE } from '../configs';
import HttpClient from '../helpers/httpClient';
import initialState from './initialState';
const { SERVER_API, endpoint } = server;
const client = new HttpClient(SERVER_API);

/**
 * Create a StateProvider component
 *
 * @param {React.ReactNode} children - The children of the StateProvider
 * @returns {JSX.Element}
 */

export default function StateProvider({ children }) {
  const [state, setState] = useState(initialState);

  /**
   * Get the new refresh token
   */
  async function getRefreshToken() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.refreshToken) {
      const { res, data } = await client.post(endpoint.refreshToken, {
        refreshToken: userData.refreshToken,
      });
      if (res.status === 200 && data.data) {
        const newAccessToken = data.data.token.accessToken;
        const newRefreshToken = data.data.token.refreshToken;
        const newUserData = {
          ...userData,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        action('userData', newUserData);
        console.clear();
        return newUserData;
      } else {
        localStorage.clear();
        action('userData', {});
        console.clear();
        throw new Error('Refresh token is not valid');
      }
    } else {
      localStorage.clear();
      action('userData', {});
      console.clear();
      throw new Error('Refresh token not found');
    }
  }

  /**
   * Check the user authentication status
   */
  const checkAuth = async () => {
    const userData = getState('userData');
    if (userData && userData.accessToken) {
      const { res } = await getData('profile', {}, userData.accessToken);
      if (res.status === 401) {
        return await getRefreshToken();
      } else {
        return userData;
      }
    }
    return userData;
  };

  /**
   * Define an action function to update the state
   *
   * @param {string} type - The type of the action
   * @param {*} payload - The payload of the action
   */
  const action = (type, payload) => {
    setState((prev) => ({ ...prev, [type]: payload }));
  };
  /**
   * Define an action function to update the state
   *
   * @param {string} type - The type of the action
   */
  const getState = (type) => {
    return state[type];
  };
  /**
   * Handle the get data request
   * @param {number} page - The page number
   */
  const handleGetData = async (page = state.page) => {
    if (!state.hasMoreData) return;
    const { data: blogs } = await getData('blogs', { limit: PER_PAGE, page });
    if (blogs?.length) {
      action('page', page);
      action('blogs', state.blogs.concat(blogs));
    } else {
      action('hasMoreData', false);
    }
  };

  /**
   * Reload the page
   * @async
   */
  const reload = async () => {
    action('loading', true);
    await checkAuth()
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .finally(() => window.location.reload());
  };

  useLayoutEffect(() => {
    action('loading', true);
    checkAuth()
      .then(() => handleGetData())
      .catch(() => reload())
      .finally(() => action('loading', false));
  }, []);

  return (
    <Provider
      value={{
        getState,
        action,
        checkAuth,
        getRefresh: getRefreshToken,
        reload,
        getData: handleGetData,
      }}>
      {children}
    </Provider>
  );
}
StateProvider.propTypes = {
  children: propTypes.node,
};
