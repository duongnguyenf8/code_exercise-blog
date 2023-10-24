import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authStyles from '../authStyles.module.scss';
import propTypes from 'prop-types';
import { endpoint } from '@/services/configs';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import Notify from '@/components/Notify';
import Section from '@/components/Section';
import Links from '@/components/Links';
import register from '@/services/helpers/auth/register';
import { validate } from '@/services/helpers/auth/validate';
import { Helmet, HelmetProvider } from 'react-helmet-async';
/**
 * A register component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.action - The setState for global action.
 * @param {function} props.store.getState - The get the global state value.
 */
export default function Register({ store }) {
  const [params, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: params.get('email') || '',
    password: '',
    name: params.get('name') || '',
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
    setSearchParams({ email: data.email.trim(), name: data.name.trim() });
    if (!loading) {
      let { email, password, name } = data;
      email = email.replaceAll(' ', '').trim();
      name = name.trim();
      if (!email || !password || !name) {
        return setError('Hãy nhập đầy đủ các trường!');
      } else {
        const msgEmail = validate('email', email);
        if (msgEmail) {
          return setError(msgEmail);
        }
        const msgPassword = validate('password', password);
        if (msgPassword) {
          return setError(msgPassword);
        }
        action('loading', true);
        const { message, code } = await register({ email, password, name });
        action('loading', false);
        if (!code || code > 201) {
          return setError(message);
        } else {
          navigate(endpoint.signIn + '?email=' + email);
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
    if (data.email && data.password && data.name) return setError('');
  }, [data.email, data.password, data.name]);
  const { form: formStyles, auth: authStyle } = authStyles;
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Đăng ký sử dụng Blogger`}</title>
        <meta name='description' content={`Trang đăng ký`} />
      </Helmet>
      <Section className={authStyle}>
        <div className='info-group column'>
          <h1>Đăng ký</h1>
          <span style={{ display: 'block', maxWidth: 700 + 'px' }}>
            Bạn muốn tham gia cộng đồng Blogger, nơi bạn có thể tạo và chia sẻ
            những bài viết độc đáo của mình? Hãy điền thông tin của bạn vào biểu
            mẫu dưới đây để tạo tài khoản miễn phí. Bạn sẽ nhận được nhiều ưu
            đãi, thông tin mới nhất và cơ hội giao lưu với những blogger khác
            khi đăng ký. Đừng bỏ lỡ cơ hội này, hãy đăng ký ngay! Nếu bạn đã có
            tài khoản, <Links to={endpoint.signIn}>Đăng nhập ngay!</Links>
          </span>
          <Links className='link'>Về trang chủ</Links>
        </div>
        <form noValidate onSubmit={handleSubmit} className={formStyles}>
          <Input
            name='name'
            value={data.name}
            placeholder='name'
            onBlur={handleBlur}
            onChange={handleChange}
          />
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
              title='Sign up'
              disabled={loading || error !== ''}
            />
            <Button
              type='submit'
              title='Sign in'
              onClick={() => navigate(endpoint.signIn)}
            />
          </div>
        </form>
        {error && (
          <Notify message={error} type='failed' position='bottom-left' />
        )}
      </Section>
    </HelmetProvider>
  );
}

Register.propTypes = {
  store: propTypes.object,
};
