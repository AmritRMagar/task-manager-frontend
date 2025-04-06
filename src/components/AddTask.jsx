import { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        title,
        userId: 1, 
      });
      setTitle('');
      onTaskAdded();
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
