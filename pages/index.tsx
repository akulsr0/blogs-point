import useSWR from 'swr';
import Link from 'next/link';
import { useState } from 'react';
import Dashboard from '../components/Dashboard';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const IndexPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useSWR('/api/index', fetcher);
  if (data) {
    return <Dashboard />;
  }

  const loginUser = () => {
    fetch('/api/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
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
            className='input-field'
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <br />
          <input
            type='password'
            placeholder='Password'
            className='input-field'
            onChange={(e) => setPassword(e.target.value)}
          />{' '}
          <br />
          <button className='button-submit' onClick={loginUser}>
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
