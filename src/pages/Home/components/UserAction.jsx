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
export default function UserAction({ store, setMsg, msg }) {
  const navigate = useNavigate();
  const { action, getRefresh, reload } = store;
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
          <FormPost store={store} setMsg={setMsg} msg={msg} />
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
              const { res } = await logout(userData.accessToken);
              if (!res.ok && res.status === 401) {
                await getRefresh()
                  .then(async (userData) => {
                    const { res } = await logout(userData.accessToken);
                    if (res.ok) {
                      localStorage.clear();
                      action('userData', {});
                      navigate(endpoint.signIn);
                    } else {
                      localStorage.clear();
                      action('userData', {});
                      reload();
                    }
                  })
                  .catch(() => {
                    localStorage.clear();
                    action('userData', {});
                    reload();
                  })
                  .finally(() => action('loading', false));
              } else {
                localStorage.clear();
                action('userData', {});
                navigate(endpoint.signIn);
                action('loading', false);
              }
              // .then(({ message }) => {
              //   if (msg.message) {
              //     setMsg({ ...msg, message: '' });
              //   }
              //   if (message) {
              //     action('userData', {});
              //   }
              // })
              //   .catch(await () => {

              // });
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
  msg: propTypes.object,
};
