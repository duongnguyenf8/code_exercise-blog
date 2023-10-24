const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')) || {},
  blogs: [],
  loading: false,
  page: 1,
  hasMoreData: true,
};
export default initialState;
