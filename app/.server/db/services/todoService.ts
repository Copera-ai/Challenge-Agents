import mongoose from 'mongoose';
import { Todo, ITodo } from '../models/todo';
import { todoEmitter } from './eventEmitter';

export class TodoService {
  static async connect() {
    if (mongoose.connection.readyState === 0) {
      const mongoUrl = process.env.MONGODB_URL!;
      await mongoose.connect(mongoUrl);
    }
  }

  static async getAllTodos(): Promise<ITodo[]> {
    await this.connect();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return todos;
  }

  static async createTodo({
    title,
    dueDate,
    completed,
  }: {
    title: string;
    dueDate?: Date | null;
    completed?: boolean;
  }): Promise<ITodo> {
    await this.connect();
    const todo = await Todo.create({ title, dueDate, completed });
    todoEmitter.emit('todo-updated');
    return todo;
  }

  static async updateTodo(
    id: string,
    data: Partial<ITodo>,
  ): Promise<ITodo | null> {
    await this.connect();
    const todo = await Todo.findByIdAndUpdate(id, data, { new: true });
    if (todo) todoEmitter.emit('todo-updated');
    return todo;
  }

  static async deleteTodo(id: string): Promise<boolean> {
    await this.connect();
    const result = await Todo.findByIdAndDelete(id);
    if (result) todoEmitter.emit('todo-updated');
    return result !== null;
  }

  static async toggleTodo(id: string): Promise<ITodo | null> {
    await this.connect();
    const todo = await Todo.findById(id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    await todo.save();
    todoEmitter.emit('todo-updated');
    return todo;
  }
}
