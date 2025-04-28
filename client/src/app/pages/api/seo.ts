import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { websiteUrl } = req.body;

    if (!websiteUrl) {
      return res.status(400).json({ message: 'Website URL is required' });
    }

    // Example: Create an SEO prompt
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `Please analyze the SEO performance of the following website and give detailed improvements: ${websiteUrl}`
      }],
    });

    const seoData = completion.data.choices[0].message?.content;

    return res.status(200).json({ seoData });
  } catch (error: any) {
    console.error('Error in SEO API:', error.response?.data || error.message || error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
