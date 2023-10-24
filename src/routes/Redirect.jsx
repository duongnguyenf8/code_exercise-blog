import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { endpoint } from '@/services/configs';

/**
 * Define the Redirect component
 * @param {String} path The path to redirect
 */

export default function Redirect({ path }) {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(path);
    }, 500);
  }, [navigate, path]);
  return (
    <div className='redirect-page'>
      <h1 style={{ color: 'white' }}>Redirecting...</h1>
      <Button
        onClick={() => {
          navigate(endpoint.blogs);
        }}
        title='Về trang chủ!'
      />
    </div>
  );
}
Redirect.propTypes = {
  path: propTypes.string,
};
