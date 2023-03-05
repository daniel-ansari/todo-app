"use client";
import {useEffect, useState} from 'react';
import {TodoDocument} from '@/models/todo';
import TodoList from '@/components/TodoList';
import {getTodos, createTodo, updateTodo, deleteTodo} from '@/services/api';

export default function Home() {
  const [todos, setTodos] = useState<TodoDocument[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const handleTodoAdd = async (todo: TodoDocument) => {
    const newTodo = await createTodo(todo);
    setTodos([...todos, newTodo]);
  };

  const handleTodoUpdate = async (updatedTodo: TodoDocument) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((t) => t._id === updatedTodo._id);
    newTodos[index] = updatedTodo;
    await updateTodo(updatedTodo);
    setTodos(newTodos);
  };

  const handleTodoDelete = async (_id: string) => {
    const newTodos = todos.filter((t) => t._id !== _id);
    await deleteTodo(_id);
    setTodos(newTodos);
  };

  // @ts-ignore
  return (
    <div
      className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div
        className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
        </div>
        <TodoList
          todos={todos}
          onTodoAdd={handleTodoAdd}
          onTodoUpdate={handleTodoUpdate}
          onTodoDelete={handleTodoDelete}
        />
      </div>
    </div>
  );
};
