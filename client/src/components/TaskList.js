import React, { useState } from 'react';
import './taskList.css';

function TaskList({ tasks, onUpdateTask }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedEstimateNotes, setUpdatedEstimateNotes] = useState('');
  const [updatedActualHours, setUpdatedActualHours] = useState('');

  const handleUpdateTask = (taskNumber) => {
    const task = tasks.find((t) => t.taskNumber === taskNumber);
    if (task) {
      setSelectedTask(task);
      setUpdatedEstimateNotes(task.estimateNotes);
      setUpdatedActualHours(task.actualHours);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedTask(null);
    setUpdatedEstimateNotes('');
    setUpdatedActualHours('');
  };

  const handleSaveUpdate = () => {
    if (selectedTask) {
      onUpdateTask(selectedTask.taskNumber, {
        estimateNotes: updatedEstimateNotes,
        actualHours: updatedActualHours,
      });
      setSelectedTask(null);
      setUpdatedEstimateNotes('');
      setUpdatedActualHours('');
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Notes</th>
            <th>Time Estimate</th>
            <th>Estimate Notes</th>
            <th>Actual Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskNumber}>
              <td>{task.taskNumber}</td>
              <td>{task.notes}</td>
              <td>{task.timeEstimate}</td>
              <td>{task.estimateNotes}</td>
              <td>{task.actualHours}</td>
              <td>
                {selectedTask === task ? (
                  <>
                    <input
                      type="text"
                      value={updatedEstimateNotes}
                      onChange={(e) => setUpdatedEstimateNotes(e.target.value)}
                      placeholder="Estimate Notes"
                    />
                    <input
                      type="text"
                      value={updatedActualHours}
                      onChange={(e) => setUpdatedActualHours(e.target.value)}
                      placeholder="Actual Hours"
                    />
                    <button onClick={handleSaveUpdate}>Save</button>
                    <button onClick={handleCancelUpdate}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleUpdateTask(task.taskNumber)}>Update Task</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
