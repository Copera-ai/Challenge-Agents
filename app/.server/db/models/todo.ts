import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// Only create the model if it doesn't exist
export const Todo =
  mongoose.models.Todo || mongoose.model<ITodo>('Todo', todoSchema);
