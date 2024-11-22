import OpenAI from 'openai';
import {configDotenv} from 'dotenv';

configDotenv();

const client = new OpenAI({
    apiKey: process.env.APIKEY,
    baseURL: 'https://api.302.ai/v1'
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {role: 'user', content: '生成一个 Table 的 React 组件'}
    ],
    stream: true
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
