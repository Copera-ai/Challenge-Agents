import { useState } from 'react';
import type { Todo } from '~/types/todo';

interface EditDialogProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, title: string, dueDate: string | null) => void;
  onDelete: (id: string) => void;
}

export function EditDialog({
  todo,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EditDialogProps) {
  const [editText, setEditText] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editText.trim()) return;
    onSave(todo._id, editText, editDueDate || null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
          <button
        onClick={() => onDelete(todo._id)}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 