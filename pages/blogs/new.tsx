import DashboardHeader from '../../components/Dashboard-header';
import { useState } from 'react';
import useSWR from 'swr';

const NewBlog = () => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');

  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/blogs', fetcher);

  if (data) {
    const saveBlog = () => {
      const tagsArr = tags.split(',').map((tag) => tag.trim());
      fetch('/api/blogs/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          tags: tagsArr,
          link,
          author: data.user,
        }),
      })
        .then(() => {
          window.alert('Blog Created');
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className='container'>
        <DashboardHeader />
        <h5 className='cursor-pointer mt-4 font-weight-bold'>
          Instructions on how to create a blog
        </h5>
        <p className='m-0'>- Add your blog title in the name field</p>
        <p className='m-0'>
          - Add tags like (comma seperated) eg. webdev, javascript
        </p>
        <p className='m-0'>
          - Write your blogs on Github in a markdown file and add its raw link
          here
        </p>

        <hr style={{ width: '100%' }} />
        <div className='my-blogs-div mt-4'>
          <h4 className='font-weight-bold'>Create New Blog</h4>
          <input
            type='text'
            className='input-field'
            placeholder='Name'
            style={{
              width: '100%',
              backgroundColor: '#f6f6f6',
              color: '#333',
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            className='input-field'
            placeholder='Tags'
            style={{
              width: '100%',
              backgroundColor: '#f6f6f6',
              color: '#333',
            }}
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type='text'
            className='input-field'
            placeholder='Link'
            style={{
              width: '100%',
              backgroundColor: '#f6f6f6',
              color: '#333',
            }}
            onChange={(e) => setLink(e.target.value)}
          />
          <button className='button-submit' onClick={saveBlog}>
            Add
          </button>
        </div>
      </div>
    );
  } else {
    return <h4>You need to login first</h4>;
  }
};

export default NewBlog;
