import { NextApiRequest, NextApiResponse } from 'next';
import Blog from '../../../models/Blog';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      const {
        query: { slug },
      } = req;
      const blog = await Blog.findOne({ slug });
      res.status(200).json(blog);
      break;
    }
    default: {
      res.status(400).end();
    }
  }
};
