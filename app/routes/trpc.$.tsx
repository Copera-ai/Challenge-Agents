import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/.server/index';
import { createContext } from '~/.server/context';

export async function handleTRPCRequest(request: Request) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: request,
    router: appRouter,
    createContext,
  });
} 
export const loader: LoaderFunction = async ({ request }) => {
  return handleTRPCRequest(request);
};

export const action: ActionFunction = async ({ request }) => {
  return handleTRPCRequest(request);
}; 