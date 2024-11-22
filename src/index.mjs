import OpenAI from 'openai';
import fs from 'fs';
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
      {role: 'system', content: fs.readFileSync('./src/system.md', 'utf-8')},
      {role: 'user', content: '生成一个 Table 的 React 组件，组件名是UserTable'},
      {role: 'assistant', content: fs.readFileSync('./src/response1.md', 'utf-8')},
      {role: 'user', content: '在这个基础上加上 sass 写下样式，并且不要用 table，有 name、age、email 三列，数据是参数传入的'}
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "getCode",
          description: "生成的组件代码",
          parameters: {
            type: "object",
            properties: {
              code1: {
                type: "string",
                description: "生成的 index.ts 代码"
              },
              code2: {
                type: "string",
                description: "生成的 interface.ts 代码"
              },
              code3: {
                type: "string",
                description: "生成的 [组件名].tsx 代码"
              },
              code4: {
                type: "string",
                description: "生成的 styles.ts 代码"
              },
            },
            required: ["code1", 'code2', 'code3', 'code4']
          }
        }
      },
    ],
    // stream: true
  });

  const res = stream.choices[0].message.tool_calls[0].function

  console.log(res)
  const codes = JSON.parse(res.arguments);

  fs.mkdirSync('./Table');
  fs.writeFileSync('./Table/index.ts', codes.code1);
  fs.writeFileSync('./Table/interface.ts', codes.code2);
  fs.writeFileSync('./Table/UserTable.tsx', codes.code3);
  fs.writeFileSync('./Table/styles.scss', codes.code4);

}

main();
