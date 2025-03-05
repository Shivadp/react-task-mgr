import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskManager } from './components/TaskManager';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <TaskManager />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;