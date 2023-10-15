import propTypes from 'prop-types';
import Header from '@/layout/Header';
import Main from '@/layout/Main';
import Footer from '@/layout/Footer';

/**
 * @param {React.ReactNode} children - The children of the Layout.
 */

export default function Layout({ children }) {
  return (
    <>
      <Header>Bài tập về nhà buổi 37 :v</Header>
      <Main>{children}</Main>
      <Footer>Chúc mọi người làm bài tập về nhà vui vẻ :v</Footer>
    </>
  );
}
Layout.propTypes = {
  children: propTypes.node,
};
