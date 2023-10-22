import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskFormComponent from './components/taskFrom';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onSubmit = (taskData) => {
    axios.post('http://localhost:3001/tasks', taskData)
      .then((response) => {
        console.log('Task created successfully:', response.data);
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  const onUpdateTask = (taskNumber, updatedData) => {
    return axios.put(`http://localhost:3001/tasks/${taskNumber}`, updatedData);
  };

  const refreshTasks = async () => {
    await getTasks();
  };

  return (
    <div className="App">
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '20vh', color: "blue" }}>Task Management App</h1>
      <TaskFormComponent onSubmit={onSubmit} />
      <TaskList tasks={tasks} onUpdateTask={onUpdateTask} refreshTasks={refreshTasks} />
    </div>
  );
}

export default App;
