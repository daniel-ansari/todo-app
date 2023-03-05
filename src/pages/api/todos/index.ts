import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import { IErrorResponse } from '@/types/response';
import { TodoModel, TodoDocument } from '@/models/todo';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TodoDocument[] | TodoDocument | IErrorResponse>) {
  await connectDB();

  if (req.method === 'POST') {
    const { title } = req.body;
    const todo: TodoDocument = new TodoModel({ title });
    await todo.save();
    res.status(201).json(todo);
  } else if (req.method === 'GET') {
    const todos: TodoDocument[] = await TodoModel.find();
    res.status(200).json(todos);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
