import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import blogStyles from './blogStyles.module.scss';
import HttpClient from '@/services/helpers/function/httpClient';
import server from '@/services/configs';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { endpoint as path } from '@/services/configs';
import { format } from '@/services/helpers/string/computedStr';
import getDate from '@/services/helpers/string/getDate';
import Tag from '@/components/Tag';

const { SERVER_API, endpoint } = server;
const client = new HttpClient(SERVER_API);
/**
 * A blog component that displays a single blog.
 */
export default function Blog() {
  const [blogData, setBlogData] = useState({
    title: 'loading...',
    content: '...',
    userId: {
      _id: path.me.slice(1),
      name: 'Loading...',
    },
    createdAt: Date.now(),
  });
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const getBlogData = async () => {
    if (id || id + '' !== 'undefined') {
      const { data } = await client.get(endpoint.blogs + '/' + id);
      if (JSON.stringify(data.data) !== '{}') {
        setBlogData(data.data);
      } else navigate(path.blogs);
    } else navigate(path.blogs);
  };
  useEffect(() => {
    getBlogData();
  }, []);

  const {
    section: sectionStyle,
    title: titleStyle,
    content: contentStyle,
    date: dateStyle,
  } = blogStyles;

  return (
    <Section className={sectionStyle}>
      <h2 className={titleStyle}>View blog:</h2>
      <h1 className={titleStyle}>{blogData.title}</h1>
      <p
        className={contentStyle}
        dangerouslySetInnerHTML={{
          __html: format(blogData.content),
        }}
      />

      <Tag
        text={blogData.userId.name}
        to={path.profile + '/' + blogData.userId._id}
      />
      <div className={dateStyle + ' date-group column'}>
        <div>{getDate(blogData.createdAt).moment.fromNow()}</div>
        <div className='time-group'>
          {Object.keys(getDate(blogData.createdAt)).map((key, index) => {
            const value = getDate(blogData.createdAt)[key];
            if (typeof value !== 'object') {
              return (
                <span key={key + index} className='date-group-item'>
                  {key}: {getDate(blogData.createdAt)[key]}
                </span>
              );
            }
          })}
        </div>
      </div>

      <Button
        onClick={() => {
          navigate(path.blogs);
        }}>
        Go home
      </Button>
    </Section>
  );
}
