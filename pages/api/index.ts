import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      res.status(200).json({ success: true, data: 'ddd' });
      break;
    }
    case 'POST': {
      res.status(201).end();
      break;
    }
    default: {
      res.status(200).json({ success: false });
      break;
    }
  }
};
