import { ActionFunction } from '@remix-run/node';
import { Agent } from '~/.server/agent';
import { LangChainAdapter } from 'ai';

export const action: ActionFunction = async ({ request }) => {
  const input = await request.json();

  const messages = input.messages ?? [];

  const agent = Agent.getInstance();

  const result = agent.streamEvents({ messages }, { version: 'v2' });

  return LangChainAdapter.toDataStreamResponse(result);
};
