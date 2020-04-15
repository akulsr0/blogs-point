import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'POST': {
      return res
        .writeHead(200, {
          'Set-Cookie': 'token=',
          'Content-Type': 'text/plain',
        })
        .end();
    }
    default:
      res.status(400).end();
  }
};
