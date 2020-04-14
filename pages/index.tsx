import Link from 'next/link';
import { useState } from 'react';
// import useSWR from 'swr';
// import fetch from 'isomorphic-unfetch';

// const fetcher = (url: any) => fetch(url).then((res) => res.json());

const IndexPage = () => {
  // const { data } = useSWR('/api/index', fetcher);
  // console.log(data);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    console.log('hitt');
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: email,
        password: password,
      }),
    });
  };

  return (
    <div className='container login-container'>
      <h1 className='font-weight-bolder'>Welcome to Blogs Point</h1>
      <div className='login-div mt-3'>
        <h5 className='font-weight-bold'>User Login</h5>
        <div className='mt-1'>
          <input
            type='text'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <br />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />{' '}
          <br />
          <button style={{ width: '100%' }} onClick={loginUser}>
            Login
          </button>
        </div>
        <Link href='/register'>
          <p className='mt-2 cursor-pointer'>Register Here</p>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
