import { llm } from './llm';
import { createReactAgent } from '@langchain/langgraph/prebuilt';


// TODO: Implement the agent to interact with the todo service

const agent = createReactAgent({
  llm: llm,
  tools: [],
});


export class Agent {
  public static getInstance() {
    return agent;
  }
}
