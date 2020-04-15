import { NextApiRequest, NextApiResponse } from 'next';
import '../../utils/db';
import User from '../../models/User';
import Blog from '../../models/Blog';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      const tokenCookie = req.headers.cookie;
      if (tokenCookie != undefined && tokenCookie.split('=')[1].length > 1) {
        const token = tokenCookie.split('=')[1];
        const decoded: any = jwt.verify(token, 'secretsecret');
        const user = await User.findById(decoded.id);
        const blogs = await Blog.find({});
        return res.status(202).json({ user, blogs });
      }
      res.status(200).end();
      break;
    }
    case 'POST': {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          const authResult = await bcrypt.compare(password, user.password);
          if (authResult) {
            const token = jwt.sign({ id: user._id }, 'secretsecret', {
              expiresIn: '24h',
            });
            return res
              .writeHead(200, {
                'Set-Cookie': 'token=' + token,
                'Content-Type': 'text/plain',
              })
              .end();
          }
        }
        res.status(201).end();
      } catch (error) {
        console.log(error);
      }
      break;
    }
    default: {
      res.status(200).json({ success: false });
      break;
    }
  }
};
