import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';

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

  const handleDelete = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      fetchTasks();
    }catch (err){
      console.error("Failed to delete task:", err);
    }
  };

  const handleToggle = async (task) =>{
    try{
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`,{
        title: task.title,
        completed: !task.completed,
      });
      fetchTasks();
    }
    catch(err){
      console.error('Failed to toggle task:', err);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List 📋</h2>
      <AddTask onTaskAdded={fetchTasks} />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
            type='checkbox'
            checked={task.completed}
            onChange={() => handleToggle(task)}
            />
            <strong>{task.title}</strong> - {task.completed ? '✅ Done' : '⏳ Pending'}
            <button
            onClick={() => handleDelete(task.id)}
            style={{ marginLeft: '1rem', color: 'red'}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
