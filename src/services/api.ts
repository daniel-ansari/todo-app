import { TodoDocument } from '@/models/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URI || '';

export const getTodos = async (): Promise<TodoDocument[]> => {
  const res = await fetch(`${API_URL}/todos`);
  const todos: TodoDocument[] = await res.json();
  return todos;
};

export const getTodo = async (_id: string): Promise<TodoDocument> => {
  const res = await fetch(`${API_URL}/todos/${_id}`);
  const todo: TodoDocument = await res.json();
  return todo;
};

export const createTodo = async (todo: TodoDocument): Promise<TodoDocument> => {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const newTodo: TodoDocument = await res.json();
  return newTodo;
};

export const updateTodo = async (todo: TodoDocument): Promise<TodoDocument> => {
  const res = await fetch(`${API_URL}/todos/${todo._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const updatedTodo: TodoDocument = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (_id: string): Promise<void> => {
  await fetch(`${API_URL}/todos/${_id}`, {
    method: 'DELETE',
  });
};
