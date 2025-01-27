import { router } from './trpc';
import { todoRouter } from './routers/todo';

// Define the root router
export const appRouter = router({
  todo: todoRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
