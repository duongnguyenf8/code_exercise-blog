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
const pathMe = path.profile + path.me;
const { SERVER_API, endpoint } = server;
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
      if (loginUserData._id === id) {
        navigate(pathMe);
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
        navigate(path.blogs);
      }
    } else navigate(path.blogs);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Section>
      <h1 style={{ display: 'flex', gap: 12 + 'px' }}>
        {location.pathname === pathMe ? 'Personal p' : 'P'}rofile:{' '}
        <Tag text={userData.name} />
      </h1>
      <Button
        onClick={() => {
          navigate(path.blogs);
        }}>
        Go home
      </Button>
      <BlogPosts data={userData} />
    </Section>
  );
}

Profile.propTypes = {
  store: propTypes.object,
};
