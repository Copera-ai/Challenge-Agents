import { z } from 'zod';
import { TodoService } from '../db/services/todoService';
import { router } from '../trpc';
import { publicProcedure } from '../trpc';

export const todoRouter = router({
  // Get all todos
  list: publicProcedure.query(async () => {
    return TodoService.getAllTodos();
  }),

  // Create a new todo
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        dueDate: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const dueDate = input.dueDate ? new Date(input.dueDate) : null;
      return TodoService.createTodo({
        title: input.title,
        dueDate,
      });
    }),

  // Update a todo
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        dueDate: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, title, dueDate } = input;
      const data = {
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
      };
      return TodoService.updateTodo(id, data);
    }),

  // Delete a todo
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return TodoService.deleteTodo(input.id);
    }),

  // Toggle todo completion
  toggle: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return TodoService.toggleTodo(input.id);
    }),
});
