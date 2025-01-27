import { EventEmitter } from 'events';

class TodoEventEmitter extends EventEmitter {
  private static instance: TodoEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): TodoEventEmitter {
    if (!TodoEventEmitter.instance) {
      TodoEventEmitter.instance = new TodoEventEmitter();
    }
    return TodoEventEmitter.instance;
  }
}

export const todoEmitter = TodoEventEmitter.getInstance(); 