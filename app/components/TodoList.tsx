import { useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import { EditDialog } from './EditDialog';
import { TodoItem } from './TodoItem';
import type { Todo } from '~/types/todo';

function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getNextDays(startDate: Date, days: number): Date[] {
  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
}

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());

  const utils = trpc.useUtils();
  const todos = trpc.todo.list.useQuery<Todo[]>();
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });
  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });
  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/todo-events');

    eventSource.onmessage = () => {
      // Invalidate and refetch todos when we receive an update
      utils.todo.list.invalidate();
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [utils]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    createTodo.mutate({
      title: newTodo,
      dueDate: newDueDate || null,
    });
    setNewTodo('');
    setNewDueDate('');
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (id: string, title: string, dueDate: string | null) => {
    if (!title.trim()) return;
    updateTodo.mutate({ id, title, dueDate });
    setEditingTodo(null);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(calendarStartDate);
    nextWeek.setDate(calendarStartDate.getDate() + 7);
    setCalendarStartDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(calendarStartDate);
    previousWeek.setDate(calendarStartDate.getDate() - 7);
    setCalendarStartDate(previousWeek);
  };

  if (todos.isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  const weekDays = getNextDays(calendarStartDate, 7);
  const todosWithDueDate = todos.data?.filter((todo) => todo.dueDate) || [];
  const todosWithoutDueDate = todos.data?.filter((todo) => !todo.dueDate) || [];

  return (
    <div className=" mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      {/* Week Calendar View */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">This Week</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousWeek}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Previous Week
            </button>
            <button
              onClick={() => setCalendarStartDate(new Date())}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Today
            </button>
            <button
              onClick={handleNextWeek}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Next Week
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="flex flex-col">
              <div className="text-center mb-2">
                <div className="font-semibold">{getDayName(day)}</div>
                <div className="text-sm text-gray-500">{day.getDate()}</div>
              </div>
              <div className="space-y-2">
                {todosWithDueDate
                  .filter((todo) =>
                    isSameDay(new Date(todo.dueDate || ''), day),
                  )
                  .map((todo) => (
                    <TodoItem
                      key={todo._id}
                      todo={todo}
                      onEdit={handleEdit}
                      onToggle={(id) => toggleTodo.mutate({ id })}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Todos */}
      {todosWithoutDueDate.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Other Todos</h2>
          <ul className="space-y-3">
            {todosWithoutDueDate.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onEdit={handleEdit}
                onToggle={(id) => toggleTodo.mutate({ id })}
              />
            ))}
          </ul>
        </div>
      )}

      {editingTodo && (
        <EditDialog
          todo={editingTodo}
          isOpen={true}
          onClose={() => setEditingTodo(null)}
          onSave={handleUpdate}
          onDelete={(id) => deleteTodo.mutate({ id })}
        />
      )}
    </div>
  );
}
