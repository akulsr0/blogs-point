import { NextApiRequest, NextApiResponse } from 'next';
import '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      const tokenCookie = req.headers.cookie;
      if (tokenCookie != undefined) {
        const token = tokenCookie.split('=')[1];
        const decoded = jwt.verify(token, 'secretsecret');
        const user = await User.findById(decoded.id);
        return res.status(202).json({ user });
      }
      res.status(200).end();
      break;
    }
    case 'POST': {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
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
