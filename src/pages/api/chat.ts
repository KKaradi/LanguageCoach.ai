// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import textToSpeech from "@/pages/api/tts";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

type Conversation = {
  role: "system" | "user" | "assistant";
  content: string;
}[];

type Response = {
  conversation?: Conversation
}

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const conversation = req.body.conversation as Conversation;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    conversation.push(
      completion.data.choices[0].message ?? { role: "assistant", content: "" }
    );

    const response_data = {
      conversation
    };
    // Return a JSON response
    res.status(200).json(response_data);
  } else {
    res.status(405).send({});
  }
}
