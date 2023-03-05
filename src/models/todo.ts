import mongoose from 'mongoose';
const modelName = 'Todo';

export interface TodoDocument extends mongoose.Document {
  _id?: string
  title: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const TodoModel = mongoose.models.Todo || mongoose.model<TodoDocument>(modelName, todoSchema);

