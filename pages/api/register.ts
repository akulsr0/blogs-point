import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import '../../utils/db';
import User from '../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'POST': {
      try {
        const { name, username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          username,
          email,
          password: hashPassword,
        });
        await user.save();
        res.status(201).end();
        break;
      } catch (error) {
        console.log(error);
        break;
      }
    }
    default: {
      res.status(200).json({ success: false });
      break;
    }
  }
};
