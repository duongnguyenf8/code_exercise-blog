import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Section from '@/components/Section';
import logout from '@/services/helpers/logout';
import { endpoint } from '@/services/configs';
import FormPost from './FormPost';
/**
 * A register component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.action - The setState for global action.
 * @param {function} props.setMsg - The setState notify to Home Component.
 */
export default function UserAction({ store, setMsg }) {
  const navigate = useNavigate();
  const { action } = store;
  const userData = store.getState('userData');
  const loading = store.getState('loading');
  return (
    <Section>
      {!userData.name ? (
        <Button
          title='Sign in'
          onClick={() => {
            navigate(endpoint.signIn);
          }}
        />
      ) : (
        <div className='user-action' style={{ position: 'relative' }}>
          <Avatar name={userData.name} to='/@me' />
          <FormPost store={store} setMsg={setMsg} />
          <Button
            type='button'
            style='secondary'
            styles={{
              position: 'absolute',
              right: '40px',
              top: '40px',
            }}
            onClick={async () => {
              action('loading', true);
              const { message } = await logout();
              action('loading', false);
              if (message) {
                action('userData', {});
              }
            }}
            disabled={loading}>
            Sign out
          </Button>
        </div>
      )}
    </Section>
  );
}

UserAction.propTypes = {
  store: propTypes.object,
  setMsg: propTypes.func,
};
