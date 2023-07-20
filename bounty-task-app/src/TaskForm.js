
import React, { useState } from 'react';
 const TaskForm = ({ onTaskSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskReward, setTaskReward] = useState('');
   const handleSubmit = (e) => {
    e.preventDefault();
    onTaskSubmit({ name: taskName, reward: taskReward });
    setTaskName('');
    setTaskReward('');
  };
   return (
    <div>
      <h2>发布任务</h2>
      <form onSubmit={handleSubmit}>
        <label>
          任务名称:
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </label>
        <label>
          任务奖励:
          <input type="text" value={taskReward} onChange={(e) => setTaskReward(e.target.value)} />
        </label>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};
 export default TaskForm;