import React, {useState} from 'react';
import {TodoDocument} from '@/models/todo';

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
    <div className="flex mb-4 items-center">
      <label className="w-full text-grey-darkest flex items-center">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <span className={todo.completed ? 'ml-2 line-through' : 'ml-2'}>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            />
          ) : (
            todo.title
          )}
        </span>
      </label>
      {isEditing ? (
        <>
          <button onClick={handleSaveEditButtonClick}
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green hover:bg-green-500">Save
          </button>
          <button onClick={handleCancelEditButtonClick}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={handleEditButtonClick}
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-400">Edit
          </button>
          <button onClick={handleDeleteButtonClick}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-400">Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
