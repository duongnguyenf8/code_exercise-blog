import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authStyles from '../authStyles.module.scss';
import propTypes from 'prop-types';
import { endpoint } from '@/services/configs';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import Notify from '@/components/Notify';
import Section from '@/components/Section';
import Links from '@/services/helpers/Links';
import register from '@/services/helpers/register';
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
        return setError('Please enter all required fields');
      } else {
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
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleBlur = (e) => {
    const field = e.target.name;
    if (data[field]?.length > 0) setError('');
    else setError('Please enter the ' + field);
  };

  useEffect(() => {
    if (data.email && data.password && data.name) return setError('');
  }, [data.email, data.password, data.name]);
  const { form: formStyles, auth: authStyle } = authStyles;
  return (
    <Section className={authStyle}>
      <div className='info-group column'>
        <h1>Sign Up</h1>
        <span>Please enter your name, email and password.</span>
        <Links className='link'>Go to home</Links>
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
      {error && <Notify message={error} type='failed' position='bottom-left' />}
    </Section>
  );
}

Register.propTypes = {
  store: propTypes.object,
};
