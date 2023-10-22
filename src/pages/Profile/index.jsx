import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import server from '@/services/configs';
import HttpClient from '@/services/helpers/function/httpClient';
import { endpoint as path } from '@/services/configs';
import Section from '@/components/Section';
import Button from '@/components/Button';
import BlogPosts from '@/components/BlogPosts';
import Tag from '@/components/Tag';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const { SERVER_API, endpoint } = server;
const pathMe = path.profile + path.me;
const client = new HttpClient(SERVER_API);
/**
 * A profile component that displays a user's profile.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 */
export default function Profile({ store }) {
  const [userData, setUserData] = useState({ name: 'loading...' });
  const { getState } = store;
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const loginUserData = getState('userData');
  const getUserData = async () => {
    if (
      id || // has ID
      id + '' !== 'undefined' || // ID not /undefined
      location.pathname === pathMe // See user profile
    ) {
      if (loginUserData._id === undefined && location.pathname === pathMe) {
        return navigate(path.signIn);
      }
      if (loginUserData._id === id) {
        return navigate(pathMe);
      }

      let profileID = id;
      if (location.pathname === pathMe) {
        profileID = loginUserData._id;
        setUserData((prev) => ({ ...prev, isProfile: true }));
      }
      const { data } = await client.get(endpoint.users + '/' + profileID);
      if (data.data) {
        setUserData((prev) => ({ ...prev, ...data.data }));
      } else {
        return navigate(path.blogs);
      }
    } else return navigate(path.blogs);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Profile: {userData.name}</title>
        <meta name='og:title' content={`Trang cá nhân của ${userData.name}`} />
        <meta
          name='og:description'
          content={`Đây là trang cá nhân của ${userData.name}, một blogger đam mê viết lách và chia sẻ những bài viết thú vị về các chủ đề khác nhau. Bạn có thể xem các bài viết của ${userData.name}, theo dõi, bình luận và liên hệ với ${userData.name} qua trang này.`}
        />
        <meta property='og:url' content={`${window.location.href}`} />
      </Helmet>
      <Section>
        <h1 style={{ display: 'flex', gap: 12 + 'px' }}>
          {location.pathname === pathMe ? 'Personal p' : 'P'}rofile:{' '}
          <Tag text={userData.name} />
        </h1>
        <Button onClick={() => navigate(path.blogs)}>Về trang chủ</Button>
        <BlogPosts data={userData} />
      </Section>
    </HelmetProvider>
  );
}

Profile.propTypes = {
  store: propTypes.object,
};
