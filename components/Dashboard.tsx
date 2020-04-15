import useSWR from 'swr';
import DashboardHeader from './Dashboard-header';
import IBlog from '../interfaces/blog';
import Link from 'next/link';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  const { data } = useSWR('/api/auth', fetcher);
  const { user, blogs } = data;
  console.log(blogs);
  if (user) {
    return (
      <div className='container'>
        <DashboardHeader />
        <div className='my-blogs-div mt-4'>
          <h4 className='font-weight-bold'>Blogs</h4>
          <div className='blogs-div'>
            {blogs.map((blog: IBlog) => (
              <Link href={`blog/${blog.slug}`}>
                <div className='blog-div' key={blog._id}>
                  <h5 className='m-0 font-weight-bold'>{blog.name}</h5>
                  <small>
                    {blog.author.name} ({blog.author.username})
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <h4>You need to login first</h4>;
  }
};

export default Dashboard;
