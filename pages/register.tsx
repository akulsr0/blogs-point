import useSWR from 'swr';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import Router from 'next/router';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useSWR('/api/index', fetcher);
  if (data) {
    Router.push('/');
  }

  const registerUser = () => {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    })
      .then(() => {
        window.alert('User Registered');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container login-container'>
      <h1 className='font-weight-bolder'>Welcome to Blogs Point</h1>
      <div className='login-div mt-3'>
        <h5 className='font-weight-bold'>User Registeration</h5>
        <div className='mt-1'>
          <input
            type='text'
            placeholder='Name'
            className='input-field'
            onChange={(e) => setName(e.target.value)}
          />{' '}
          <br />
          <input
            type='text'
            placeholder='Username'
            className='input-field'
            onChange={(e) => setUsername(e.target.value)}
          />{' '}
          <br />
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
          <button className='button-submit' onClick={registerUser}>
            Register
          </button>
        </div>
        <Link href='/'>
          <p className='mt-2 cursor-pointer'>Already have an account</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
