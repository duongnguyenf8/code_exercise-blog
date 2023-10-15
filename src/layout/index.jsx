import propTypes from 'prop-types';
import Header from '@/layout/Header';
import Main from '@/layout/Main';
import Footer from '@/layout/Footer';
import Tag from '@/components/Tag';

/**
 * @param {React.ReactNode} children - The children of the Layout.
 */

export default function Layout({ children }) {
  return (
    <>
      <Header>
        <Tag
          title='Xin chào, em là Dương, mọi người có thể xem document, hướng dẫn làm bài
        tập tại ĐÂY'
          to='https://github.com/duongnguyenf8/code_fullstack-exercise37'
        />
      </Header>
      <Main>{children}</Main>
      <Footer>Chúc mọi người làm bài tập về nhà vui vẻ :v</Footer>
    </>
  );
}
Layout.propTypes = {
  children: propTypes.node,
};
