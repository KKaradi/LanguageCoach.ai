// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Get the request data as JSON
    const data = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: data}],
    });
    console.log(completion.data.choices[0].message);
    // Do something with the data
    const response_data = {
      message: 'Received POST request with data:',
      data: completion.data.choices[0].message,
      name:'r'
    }
    console.log(req.body)
    // Return a JSON response
    res.status(200).json(response_data);
  } else {
    res.status(405).send({name:"Illegal"});
  }
  
}
