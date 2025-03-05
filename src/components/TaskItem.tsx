import React from 'react';
import { useDispatch } from 'react-redux';
import { Check, Trash2, Circle, GripVertical } from 'lucide-react';
import { toggleTask, deleteTask } from '../store/taskSlice';
import { Task } from '../types/task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <GripVertical size={18} />
        </div>
        <button
          onClick={() => dispatch(toggleTask(task.id))}
          className={`p-1 rounded-full transition-colors ${
            task.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400'
          }`}
        >
          {task.completed ? <Check size={20} /> : <Circle size={20} />}
        </button>
        <span className={`${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};