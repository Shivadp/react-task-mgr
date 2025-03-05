import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { CheckSquare, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { reorderTasks } from '../store/taskSlice';

export const TaskManager: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      dispatch(reorderTasks(newTasks));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <CheckSquare className="text-blue-500" />
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {completedTasks} of {tasks.length} completed
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="text-gray-500 dark:text-gray-400" size={20} />
              ) : (
                <Moon className="text-gray-500" size={20} />
              )}
            </button>
          </div>
        </div>
        
        <TaskInput />
        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};