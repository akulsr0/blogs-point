import useSWR from 'swr';
import { useRouter } from 'next/router';
import DashboardHeader from '../../components/Dashboard-header';
import marked from 'marked';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Blog = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useSWR(`/api/blog/${slug}`, fetcher);

  if (data) {
    fetch(data.link)
      .then((res) => res.text())
      .then((text) => {
        let el: HTMLElement | null = document.getElementById('blog-content');
        console.log(el);
        if (el) {
          el.innerHTML = marked(text);
        }
      });

    return (
      <div className='container'>
        <DashboardHeader />
        <div id='blog-content' className='mt-3'></div>
      </div>
    );
  } else {
    return <br />;
  }
};

export default Blog;
