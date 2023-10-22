
import React, { useState } from 'react';
import '../../src/components/taskFrom.css'; 
import axios from 'axios'; 

import { SuccessModal,ErrorModal } from './notification';

const TaskFormComponent = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState({
    taskNumber: '',
    timeEstimate: '',
    estimateNotes: '',
    actualHours: '',
    notes: '',
  });

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/tasks', taskData)
      .then((response) => {
        console.log('Task created successfully:', response.data);
      
        if (response.data.acknowledged === true) {
          setSuccessModalOpen(true); 
        }
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        if (error.response.status === 400) {
          setErrorModalOpen(true); 
        }
        
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Task creation form</h1>

        <div>
          <label >Task Number*</label>
          <input
            type="text"
            name="taskNumber"
            value={taskData.taskNumber}
            onChange={handleChange}
            placeholder='It should be start with L###### (# is a 6 digit ) '
            required
          />
        </div>
        <div>
          <label>Time Estimate*</label>
          <input
            type="text"
            name="timeEstimate"
            value={taskData.timeEstimate}
            onChange={handleChange}
            placeholder='Enter TimeEstimate '
            required
          />
        </div>
        <div>
          <label>Estimate Notes*</label>
          <input
            type="text"
            name="estimateNotes"
            value={taskData.estimateNotes}
            placeholder='Enter the Estimate Notes'
            onChange={handleChange}

          />
        </div>
        <div>
          <label> actual Hours*</label>
          <input
            type="text"
            name="actualHours"
            value={taskData.actualHours}
            onChange={handleChange}
            placeholder='Enter Actual Hours '
            required
          />
        </div>
        <div>
          <label> notes*</label>
          <input
            type="text"
            name="notes"
            value={taskData.notes}
            onChange={handleChange}
            placeholder=' Enter notes '
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setSuccessModalOpen(false)}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setErrorModalOpen(false)}
      />
    </div>
  );
};

export default TaskFormComponent;

