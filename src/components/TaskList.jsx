import { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List 📋</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.completed ? '✅ Done' : '⏳ Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
