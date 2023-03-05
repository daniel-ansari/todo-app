import { TodoDocument } from '@/models/todo';
const BASE_URL = '/api/todos';

export const getTodos = async (): Promise<TodoDocument[]> => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createTodo = async (todo: TodoDocument): Promise<TodoDocument> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodo = async (todo: TodoDocument): Promise<TodoDocument> => {
  const response = await fetch(`${BASE_URL}/${todo._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (_id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${_id}`, {
    method: 'DELETE',
  });
};
