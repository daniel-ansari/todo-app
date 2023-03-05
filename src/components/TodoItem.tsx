import React, {useState} from 'react';
import { TodoDocument} from '@/models/todo';

interface TodoItemProps {
  todo: TodoDocument;
  onTodoUpdate: (updatedTodo: TodoDocument) => void;
  onTodoDelete: (_id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                             todo,
                                             onTodoUpdate,
                                             onTodoDelete,
                                           }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleCheckboxChange = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    onTodoUpdate(updatedTodo as TodoDocument);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditButtonClick = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleSaveEditButtonClick = () => {
    onTodoUpdate({
      ...todo,
      title: editedTitle,
    } as TodoDocument);
    setIsEditing(false);
  };

  const handleDeleteButtonClick = () => {
    onTodoDelete(todo._id!);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <span className={todo.completed ? 'line-through' : ''}>
    {isEditing ? (
      <input
        type="text"
        value={editedTitle}
        onChange={handleTitleChange}
      />
    ) : (
      todo.title
    )}
  </span>
      </label>
      {isEditing ? (
        <>
          <button onClick={handleSaveEditButtonClick}>Save</button>
          <button onClick={handleCancelEditButtonClick}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditButtonClick}>Edit</button>
          <button onClick={handleDeleteButtonClick}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
