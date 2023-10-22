import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { endpoint } from '@/services/configs';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import Notify from '@/components/Notify';
import Section from '@/components/Section';
import Links from '@/components/Links';
import login from '@/services/helpers/auth/login';
import { validate } from '@/services/helpers/auth/validate';
import authStyles from '../authStyles.module.scss';
/**
 * A login component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.action - The setState for global action.
 * @param {function} props.store.getState - The get the global state value.
 */
export default function Login({ store }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: params.get('email') || '',
    password: '',
  });
  const { action, getState } = store;
  const loading = getState('loading');
  const userData = getState('userData');
  useEffect(() => {
    if (userData.name) {
      navigate(endpoint.blogs);
    }
  }, [navigate, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      action('loading', true);
      let { email, password } = data;
      email = email.replaceAll(' ', '').trim();
      if (!email || !password) {
        return setError('Hãy nhập đủ tất cả các trường!');
      } else {
        const msgEmail = validate('email', email);
        if (msgEmail) {
          return setError(msgEmail);
        }
        const msgPassword = validate('password', password);
        if (msgPassword) {
          return setError(msgPassword);
        }
        const { data, message } = await login({ email, password });
        action('loading', false);
        if (!data) {
          return setError(message);
        } else {
          const { email, name, _id, accessToken, refreshToken } = data;
          action('userData', {
            email,
            name,
            _id,
            accessToken,
            refreshToken,
          });
          navigate(endpoint.blogs);
        }
      }
    }
  };

  const handleChange = (e) => {
    setError('');
    action('loading', false);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const field = e.target.name;
    if (data[field]?.length > 0) setError('');
    else setError('Hãy nhập ' + field + ' của bạn!');
  };

  useEffect(() => {
    if (data.email && data.password) return setError('');
  }, [data.email, data.password]);

  const { form: formStyles, auth: authStyle } = authStyles;
  return (
    <>
      <Helmet>
        <title>{`Đăng nhập vào Blogger`}</title>
        <meta name='description' content={`Trang đăng nhập`} />
      </Helmet>
      <Section className={authStyle}>
        <div className='info-group column'>
          <h1>Đăng nhập</h1>
          <span style={{ display: 'block', maxWidth: 700 + 'px' }}>
            Hãy nhập email và mật khẩu của bạn để truy cập vào nền tảng Blogger,
            nơi bạn có thể tạo và chia sẻ những bài viết độc đáo của mình. Nếu
            bạn chưa có tài khoản, hãy{' '}
            <Links to={endpoint.signUp}>đăng ký ngay</Links> để tham gia cộng
            đồng Blogger
          </span>
          <Links className='link'>Về trang chủ</Links>
        </div>
        <form noValidate onSubmit={handleSubmit} className={formStyles}>
          <Input
            name='email'
            type='email'
            value={data.email}
            placeholder='email'
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            name='password'
            type='password'
            placeholder='password'
            value={data.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className='button-group'>
            <Button
              type='submit'
              title='Sign in'
              disabled={loading || error !== ''}
            />
            <Button
              type='button'
              title='Sign up'
              onClick={() => navigate(endpoint.signUp)}
            />
          </div>
        </form>
        {error && (
          <Notify
            message={error || 'Some thing was error'}
            type='failed'
            position='bottom-left'
          />
        )}
      </Section>
    </>
  );
}

Login.propTypes = {
  store: propTypes.object,
};
