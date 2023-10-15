import Button from '@/components/Button';
import postBlog from '../helpers/postBlog';
import Input from '@/components/Input/Input';
import propTypes from 'prop-types';
import { useState } from 'react';
import Textarea from '@/components/Textarea';
import { format } from '@/services/helpers/computedStr';
/**
 * A register component that handles user authentication.
 * @param {object} props - The props of the component.
 * @param {object} props.store - The context store.
 * @param {function} props.store.action - The setState for global action.
 * @param {function} props.store.getState - The get the global state value.
 * @param {function} props.store.getData - The request to get the new global state value.
 * @param {function} props.setMsg - The setState msg to notify.
 */
export default function FormPost({ store, setMsg }) {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
  });
  const { action, getState, checkAuth } = store;
  const blogs = getState('blogs');
  const userData = getState('userData');
  const loading = getState('loading');
  async function handleSubmit(e) {
    e.preventDefault();
    await checkAuth();
    setMsg((prev) => ({
      msg: '',
      ...prev,
    }));
    const computedContent = format(blog.content, 'textarea');
    const computedTitle = format(blog.title, 'input');
    if (computedContent.length > 0 && computedTitle.length > 0) {
      action('loading', true);
      const { data = {}, message = '' } = await postBlog(
        {
          title: computedTitle,
          content: computedContent,
        },
        userData.accessToken
      );
      action('loading', false);
      if (JSON.stringify(data) === '{}' && message) {
        setMsg({
          type: 'failed',
          message: message,
        });
        return;
      } else {
        setMsg({
          type: 'success',
          msg: 'Thêm bài viết thành công!',
        });
        action('blogs', [data, ...blogs]);
        setBlog({
          title: '',
          content: '',
        });
      }
    } else {
      if (computedTitle.length === 0) {
        setMsg({
          type: 'failed',
          msg: 'Vui lòng nhập tiêu đề bài viết',
        });
        e.target.title.focus();
      } else if (computedContent.length === 0) {
        setMsg({
          type: 'failed',
          msg: 'Vui lòng nhập nội dung bài viết',
        });
        e.target.content.focus();
      } else {
        setMsg({
          type: 'failed',
          msg: 'Vui lòng xem lại nội dung',
        });
        e.target.title.focus();
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name='title'
        placeholder='title'
        onChange={(e) => {
          setBlog({ ...blog, title: e.target.value });
        }}
        value={blog.title}
      />
      <Textarea
        name='content'
        className='border'
        placeholder='content'
        value={blog.content}
        onChange={(e) => {
          setBlog({ ...blog, content: e.target.value });
        }}
      />
      <Button
        type='submit'
        disabled={loading}
        styles={{ marginTop: 12 + 'px' }}>
        Write new!
      </Button>
    </form>
  );
}

FormPost.propTypes = {
  store: propTypes.object,
  setMsg: propTypes.func,
};
