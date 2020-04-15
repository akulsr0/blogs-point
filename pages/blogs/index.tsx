import DashboardHeader from '../../components/Dashboard-header';
import Link from 'next/link';
import useSWR from 'swr';
import IBlog from '../../interfaces/blog';

const MyBlogs = () => {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/blogs', fetcher);
  if (data) {
    return (
      <div className='container'>
        <DashboardHeader />
        <div className='my-blogs-div mt-4'>
          <h4 className='font-weight-bold'>My Blogs</h4>
          <div className='blogs-div'>
            {data.myBlogs.map((blog: IBlog) => (
              <Link href={`blog/${blog.slug}`} key={blog._id}>
                <div className='blog-div'>
                  <h5 className='m-0 font-weight-bold'>{blog.name}</h5>
                  <small>
                    {blog.author.name} ({blog.author.username})
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link href='/blogs/new'>
          <h6 className='text-center cursor-pointer mt-2'>Create New Blog</h6>
        </Link>
      </div>
    );
  } else {
    return <h4>You need to login first</h4>;
  }
};

export default MyBlogs;
