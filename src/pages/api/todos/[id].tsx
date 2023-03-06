import type {NextApiRequest, NextApiResponse} from 'next';
import {TodoModel, TodoDocument} from '@/models/todo';
import {IErrorResponse} from "../../../types/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoDocument | IErrorResponse>
) {
  const _id = String(req.query.id);
  if (req.method === 'GET') {
    const todo = await TodoModel.findOne({_id})
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json(todo);

  } else if (req.method === 'PUT') {
    const {_id, title, completed} = req.body;
    const opts = { new: true };
    const updatedTodo = await TodoModel.findOneAndUpdate(
      {_id},
      {title, completed},
      opts
    )
    res.status(200).json(updatedTodo);
  } else if (req.method === 'DELETE') {
    await TodoModel.findOneAndDelete({_id});
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
