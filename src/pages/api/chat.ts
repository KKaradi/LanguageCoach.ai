// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Get the request data as JSON
    const data = req.body;

    // Do something with the data
    const response_data = {
      message: 'Received POST request with data:',
      data: data
    }

    // Return a JSON response
    res.status(200).json(response_data);
  } else {
    res.status(405).send('Method Not Allowed');
  }

  console.log(req.query)

  res.status(200).json(req.body)
  
}
