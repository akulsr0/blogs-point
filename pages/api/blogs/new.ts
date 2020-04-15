import { NextApiRequest, NextApiResponse } from 'next';
import '../../../utils/db';
import Blog from '../../../models/Blog';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      res.status(200).end();
      break;
    }
    case 'POST': {
      const { name, tags, link, author } = req.body;
      const slug = name
        .replace(/[^a-zA-Z ]/g, ' ')
        .split(' ')
        .map((e: String) => e.toLowerCase())
        .join('-');
      const blog = new Blog({ name, tags, link, author, slug });
      await blog.save();
      res.status(201).end();
      break;
    }
    default: {
      res.status(400).end();
      break;
    }
  }
};
