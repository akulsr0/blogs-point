import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            onChange={(e) => setName(e.target.value)}
          />{' '}
          <br />
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />{' '}
          <br />
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
          <button style={{ width: '100%' }} onClick={registerUser}>
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
