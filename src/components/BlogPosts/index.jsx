import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Avatar from '@/components/Avatar';
import Section from '@/components/Section';
import Tag from '@/components/Tag';
import { PER_PAGE, endpoint } from '@/services/configs';
import { format } from '@/services/helpers/computedStr';
import { removeAccents } from '@/services/helpers/computedStr';
import blogStyles from './blogStyles.module.scss';
import getDate from '@/services/helpers/getDate';
import { useLocation } from 'react-router-dom';

/**
 * Define the component
 * @param {object} store - The redux store
 * @param {object} data - The data to render
 */
export default function BlogPosts({ msg, setMsg, store, data = {} }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const {
    moment: momentStyle,
    title: titleStyle,
    section: sectionStyle,
    name: nameStyle,
    date: dateStyle,
    time: timeStyle,
    'time-reading': timeReadingStyle,
  } = blogStyles;
  useEffect(() => {
    if (location.pathname === endpoint.blogs) {
      const { getState } = store;
      setBlogs(getState('blogs'));
      setUser(getState('userData'));
    } else {
      const { blogs: blogsData, ...restData } = data;
      setBlogs(blogsData);
      setUser(restData);
    }
  }, [data, location.pathname, store]);
  useEffect(() => {
    if (location.pathname === endpoint.blogs) {
      const { getState, getData } = store;
      const page = getState('page');
      const handleScroll = async () => {
        const bottom = window.innerHeight + window.scrollY;
        const section = document.querySelector('.' + sectionStyle);
        if (
          !loading &&
          bottom >=
            document.body.offsetHeight - section?.clientHeight * (PER_PAGE - 1)
        ) {
          if (!loading) {
            if (msg.message) {
              setMsg({ ...msg, message: '' });
            }
            setLoading(true);
            getData(page + 1).finally(() => setLoading(false));
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loading, location.pathname, msg, sectionStyle, setMsg, store]);

  /**
   * Get time reading
   * @param {string} str - The string to split
   * @param {string} str2 - The second string to split
   * @returns {string} The time reading
   */
  const getTimeReading = (str, str2 = '') => {
    const words = (str + str2).split(' ');
    const timeSecond = Math.ceil(words.length / 3);
    const timeMinute = Math.floor(timeSecond / 60);
    const timeHour = Math.floor(timeMinute / 60);
    if (timeMinute === 0) {
      return `${timeSecond} giây`;
    }
    if (timeMinute > 60) {
      return `${timeHour} giờ`;
    }
    return `${timeMinute} phút`;
  };
  return (
    <div className='blog-list'>
      {location.pathname !== endpoint.blogs && (
        <h1 className={titleStyle}>View user blog:</h1>
      )}
      {blogs?.length > 0 ? (
        <div className='content'>
          {blogs.map((blog, index) => {
            const fullDate = getDate(blog.createdAt);
            const { moment, hours, mins } = fullDate;
            const get12Hours = (hours) => {
              if (hours > 12) {
                return hours - 12 + 'h chiều';
              }
              return hours + 'h sáng';
            };
            return (
              <Section className={sectionStyle} key={blog._id + `${index}`}>
                <div className={dateStyle}>
                  <span className={momentStyle}>{moment.fromNow()}</span>
                  <div className={timeStyle + ' time-group column'}>
                    <span className='hours'>{get12Hours(hours)}</span>
                    <span className='mins'>{mins + ' phút'}</span>
                  </div>
                </div>

                <Avatar
                  name={
                    location.pathname === endpoint.blogs
                      ? blog.userId.name ?? ''
                      : user.name ?? ''
                  }
                  to={
                    location.pathname === endpoint.blogs // if is home
                      ? blog.userId._id !== user._id // if user is not login profile
                        ? `${endpoint.profile}/${blog.userId._id}` // "to" by id
                        : endpoint.me // if user is login profile -> "to" by @me
                      : user.isProfile // if not home and user is login profile
                      ? endpoint.me // "to" by @me
                      : `${endpoint.profile}/${user._id}` // "to" by id
                  }
                />
                <h3 className={titleStyle}>{blog.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: format(
                      blog.content.length > 160
                        ? blog.content.slice(0, 160) + '...'
                        : blog.content
                    ),
                  }}
                />
                <Tag
                  text={
                    'View more ' +
                      removeAccents(blog.title.slice(0, 10) + '...') ?? '...'
                  }
                  to={`${endpoint.blog}/${blog._id}`}
                />
                {location.pathname === endpoint.blogs && (
                  <Tag
                    text={
                      removeAccents(blog.userId.name.replaceAll(' ', '')) ??
                      '###'
                    }
                    to={
                      blog.userId._id !== user._id
                        ? `${endpoint.profile}/${blog.userId._id}`
                        : endpoint.me
                    }
                  />
                )}
                <span className={nameStyle}>
                  {'@' +
                    (location.pathname === endpoint.blogs
                      ? removeAccents(blog.userId.name) ?? '...'
                      : removeAccents(user.name) ?? '...')}
                </span>
                <span className={timeReadingStyle}>
                  Khoảng {getTimeReading(blog.content, blog.title)} đọc.
                </span>
                <hr style={{ width: 100 + '%' }} />
              </Section>
            );
          })}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

BlogPosts.propTypes = {
  store: propTypes.object,
  data: propTypes.object,
  msg: propTypes.object,
  setMsg: propTypes.func,
};
