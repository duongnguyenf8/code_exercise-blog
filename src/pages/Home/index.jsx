import propTypes from 'prop-types';
import homeStyles from './styles/homeStyles.module.scss';
import { useEffect, useState } from 'react';
import UserAction from './components/UserAction';
import BlogPosts from '@/components/BlogPosts';
import Notify from '@/components/Notify';
import { TIMEOUT } from '@/services/configs';
/**
 * A register component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.getData - The request to get the new global state value.
 */
export default function Home({ store }) {
  const { reload, checkAuth, getState } = store;
  const [msg, setMsg] = useState({
    type: 'success',
    message: '',
  });
  const userData = getState('userData');

  useEffect(() => {
    const preReload = async (e) => {
      if ((e.key === 'r' && e.ctrlKey) || e.key === 'F5') {
        e.preventDefault();
        if (msg.message) {
          setMsg({ ...msg, message: '' });
        }
        reload();
      }
    };
    window.addEventListener('keydown', preReload);
    return () => window.removeEventListener('keydown', preReload);
  }, [msg, reload]);

  useEffect(() => {
    const id = setInterval(() => {
      if (userData) {
        setMsg({ ...msg, message: '' });
        checkAuth();
      }
    }, TIMEOUT * 1000);
    return () => clearInterval(id);
  }, [userData]);

  const { title: titleStyle } = homeStyles;
  return (
    <div className='home-page'>
      <h1 className={titleStyle}>Blogger</h1>
      <UserAction msg={msg} setMsg={setMsg} store={store} />
      <BlogPosts store={store} setMsg={setMsg} msg={msg} />
      {msg.message && <Notify message={msg.message} type={msg.type} />}
    </div>
  );
}

Home.propTypes = {
  store: propTypes.object,
};
