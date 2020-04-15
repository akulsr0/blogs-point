import { NextApiRequest, NextApiResponse } from 'next';
import '../../../utils/db';
import User from '../../../models/User';
import Blog from '../../../models/Blog';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      const tokenCookie = req.headers.cookie;
      if (tokenCookie != undefined && tokenCookie.split('=')[1].length > 1) {
        const token = tokenCookie.split('=')[1];
        const decoded = jwt.verify(token, 'secretsecret');
        const user = await User.findById(decoded.id).select(
          'name email username'
        );
        const blogs = await Blog.find({});
        let myBlogs = blogs.filter((blog) => blog.author.email === user.email);
        return res.status(202).json({ user, myBlogs });
      }
      res.status(200).end();
      break;
    }
    default: {
      res.status(400).end();
      break;
    }
  }
};
