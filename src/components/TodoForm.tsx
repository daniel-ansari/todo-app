type Props = {
  newTodo: string;
  setNewTodo: (value: string) => void;
  onTodoAdd: () => void;
};

const TodoForm = ({newTodo, setNewTodo, onTodoAdd}: Props) => {
  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTodoAdd();
  };

  return (
    <form onSubmit={handleNewTodoSubmit} className="mb-4">
      <div className="flex mt-4">
        <input type="text" value={newTodo} onChange={handleNewTodoChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"/>
        <button type="submit"
                className="flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-400">Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
