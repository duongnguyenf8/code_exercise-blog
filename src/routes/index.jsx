import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Consumer } from '@/services/context/Provider';
import { endpoint } from '@/services/configs';
import StateProvider from '@/services/context';
import Redirect from './Redirect';
import Home from '@/pages/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Profile from '@/pages/Profile';
import Blog from '@/pages/Blog';
/**
 * A router component that manages the routes of the application.
 */
export default function Router() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const pathAuth = [
    { path: '/sign-in', to: endpoint.signIn },
    { path: '/signin', to: endpoint.signIn },
    { path: '/login', to: endpoint.signIn },
    { path: '/sign-up', to: endpoint.signUp },
    { path: '/signup', to: endpoint.signUp },
    { path: '/register', to: endpoint.signUp },
  ];
  return (
    <StateProvider>
      <Consumer>
        {(store) => {
          const userId = store.getState('userData')?._id;
          const profilePath = userId ? endpoint.profile + endpoint.me : '/';
          return (
            <Routes>
              <Route path={endpoint.blogs}>
                <Route path='' element={<Home store={store} />} />
                <Route path={endpoint.blog}>
                  <Route path='' element={<Redirect path={endpoint.blogs} />} />
                  <Route path=':id' element={<Blog store={store} />} />
                </Route>
              </Route>
              {/* This is auth resource */}
              <Route path={endpoint.auth}>
                <Route path='' element={<Redirect path={endpoint.signIn} />} />
                <Route
                  path={endpoint.signIn.slice(endpoint.auth.length + 1)}
                  element={<Login store={store} />}
                />
                <Route
                  path={endpoint.signUp.slice(endpoint.auth.length + 1)}
                  element={<Register store={store} />}
                />
              </Route>
              {pathAuth.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={<Redirect path={item.to} />}
                  />
                );
              })}
              {/* This is profile resource */}
              <Route path={endpoint.profile}>
                <Route path='' element={<Redirect path={profilePath} />} />
                <Route
                  path={endpoint.me.slice(1)}
                  element={<Profile store={store} />}
                />
                <Route path=':id' element={<Profile store={store} />} />
              </Route>
              <Route
                path={endpoint.me}
                element={<Redirect path={profilePath} />}
              />
              {/* All error */}
              <Route path='*' element={<Redirect path={endpoint.blogs} />} />
            </Routes>
          );
        }}
      </Consumer>
    </StateProvider>
  );
}
