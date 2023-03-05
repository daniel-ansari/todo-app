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
    <form onSubmit={handleNewTodoSubmit}>
      <input type="text" value={newTodo} onChange={handleNewTodoChange}/>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
