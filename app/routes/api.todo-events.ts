import type { LoaderFunction } from '@remix-run/node';
import { todoEmitter } from '~/.server/db/services/eventEmitter';

export const loader: LoaderFunction = async ({ request }) => {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue('retry: 1000\n\n');

        const listener = () => {
          controller.enqueue(`data: updated\n\n`);
        };

        todoEmitter.on('todo-updated', listener);

        // Clean up the listener when the client disconnects
        request.signal.addEventListener('abort', () => {
          todoEmitter.off('todo-updated', listener);
        });
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    },
  );
};
