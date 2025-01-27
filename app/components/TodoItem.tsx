import type { Todo } from '~/types/todo';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onToggle: (id: string) => void;
}

export function TodoItem({
  todo,
  onEdit,
  onToggle,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
      />

      <div className="flex-1">
        <button onClick={() => onEdit(todo)} className="text-left w-full">
          <span
            className={`block ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </span>
        </button>
      </div>
    </li>
  );
} 