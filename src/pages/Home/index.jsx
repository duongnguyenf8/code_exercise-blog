import propTypes from 'prop-types';
import homeStyles from './styles/homeStyles.module.scss';
import { useLayoutEffect, useState } from 'react';
import UserAction from './components/UserAction';
import BlogPosts from '@/components/BlogPosts';
import Notify from '@/components/Notify';
/**
 * A register component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.getData - The request to get the new global state value.
 */
export default function Home({ store }) {
  const { getData } = store;
  const [msg, setMsg] = useState({
    type: 'success',
    message: '',
  });
  const { title: titleStyle } = homeStyles;
  useLayoutEffect(() => {
    getData();
  }, []);
  return (
    <div className='home-page'>
      <h1 className={titleStyle}>Blogger</h1>
      <UserAction setMsg={setMsg} store={store} />
      <BlogPosts store={store} />
      {msg.msg && <Notify message={msg.msg} type={msg.type} />}
    </div>
  );
}

Home.propTypes = {
  store: propTypes.object,
};
