import {useState} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { TodoDocument } from '@/models/todo';

type Props = {
  todos: TodoDocument[];
  onTodoAdd: (todo: TodoDocument) => void;
  onTodoUpdate: (todo: TodoDocument) => void;
  onTodoDelete: (_id: string) => void;
};

const TodoList = ({todos, onTodoAdd, onTodoUpdate, onTodoDelete}: Props) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleTodoAdd = async () => {
    if (!newTodo) return;

    await onTodoAdd({
      title: newTodo,
      completed: false
    } as TodoDocument);
    setNewTodo('');
  };

  return (
    <div>
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        onTodoAdd={handleTodoAdd}
      />
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onTodoUpdate={onTodoUpdate}
          onTodoDelete={onTodoDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
