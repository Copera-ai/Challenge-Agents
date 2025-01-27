import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return {
    req,
    resHeaders,
    // Add any shared context here, like database connections
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 