/**
 * A configuration object that contains the API endpoint and other configurations.
 */
const server = {
  SERVER_API: 'https://api-auth-two.vercel.app',
  endpoint: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    blogs: '/blogs',
    users: '/users',
    profile: '/users/profile',
  },
};

/**
 * A collection of constants that resources.
 */
export const endpoint = {
  blogs: '/',
  blog: '/blog',
  profile: '/profile',
  me: '/@me',
  auth: '/auth',
  signUp: '/auth/sign-up',
  signIn: '/auth/sign-in',
};
/**
 * The number of items per page.
 */
export const PER_PAGE = 6;
export default server;
