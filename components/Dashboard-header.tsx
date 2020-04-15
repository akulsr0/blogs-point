import useSWR from 'swr';
import Link from 'next/link';
import Router from 'next/router';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  const { data } = useSWR('/api/auth', fetcher);

  const logoutUser = async () => {
    await fetch('/api/logout', { method: 'POST' });
    console.log('refresh');
    Router.reload();
  };

  if (data) {
    return (
      <div className='header-dashboard p-2 pt-4 pb-4 mt-3 rounded'>
        <Link href='/'>
          <h4 className='m-1 font-weight-bold flex-grow-1 cursor-pointer'>
            {data.user.name}
          </h4>
        </Link>
        <Link href='/blogs'>
          <h6 className='m-0 cursor-pointer'>My Blogs</h6>
        </Link>
        <h6 className='m-0 ml-2 cursor-pointer' onClick={logoutUser}>
          Logout
        </h6>
      </div>
    );
  } else {
    return <br />;
  }
};

export default Dashboard;
