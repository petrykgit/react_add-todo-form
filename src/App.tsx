import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ToDoAggregate } from './domain/ToDoAggregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todoWithoutID: Omit<Todo, 'id'>) => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...todoWithoutID,
        id: maxId + 1,
      },
    ]);
  };

  const aggregatedTodos = todos.map(todo => {
    const user = usersFromServer.find(({ id }) => id === todo.userId) ?? null;

    const toDoAggrigate: ToDoAggregate = {
      ...todo,
      user,
    };

    return toDoAggrigate;
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={handleAddTodo} />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
