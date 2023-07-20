
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Modal from 'react-modal';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  // 发布任务 弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskReward, setTaskReward] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskSubmit = () => {
    // 处理任务提交逻辑
    // ...
     // 关闭弹出框
    handleCloseModal();
  };

  useEffect(() => {
    loadTasks();
  }, []);
  const contractAddress = '0x00';
  const contractAbi = []; 

   const loadTasks = async () => {
    // 连接到以太坊网络
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 加载智能合约
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    // 获取任务数量
    const taskCount = 0;// = await contract.taskCount();
    // 获取每个任务的详细信息
    const tasks = [{"id":1, "name":'dooo',"reward":300}];
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.tasks(i);
      tasks.push(task);
    }
    // 更新任务列表
    setTasks(tasks);
  };
   const handleUpdateStatus = async () => {
    try {
      // 连接到以太坊网络
      const provider = new ethers.BrowserProvider(window.ethereum);
      // 加载智能合约
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      // 使用Metamask钱包签名交易
      const signer = provider.getSigner();
      const transaction = await contract.updateStatus(selectedTask, newStatus);
      const signedTransaction = await signer.signTransaction(transaction);
      // 发送签名交易
      await provider.sendTransaction(signedTransaction);
      // 刷新任务列表
      loadTasks();
      // 关闭弹出框
      setSelectedTask(null);
      setNewStatus('');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
   return (
    <div>
      <h1>任务列表</h1>
      <button onClick={handleOpenModal}>发布任务</button>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
       <h2>发布任务</h2>
       <form onSubmit={handleTaskSubmit}>
         <label>
           任务名称:
           <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
         </label>
         <label>
           任务奖励:
           <input type="text" value={taskReward} onChange={(e) => setTaskReward(e.target.value)} />
         </label>
         <button type="submit">提交</button>
         <button onClick={handleCloseModal}>取消</button>
       </form>
     </Modal>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>奖金</th>
            <th>发布者</th>
            <th>执行者</th>
            <th>发布时间</th>
            <th>执行评价</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.reward}</td>
              <td>{task.issuer}</td>
              <td>{task.executor}</td>
              <td>{new Date(task.createdAt * 1000).toLocaleString()}</td>
              <td>{task.rating}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => setSelectedTask(task.id)}>修改状态</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTask && (
        <div>
          <h2>修改任务状态</h2>
          <label>
            新状态：
            <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
          </label>
          <button onClick={handleUpdateStatus}>提交</button>
        </div>
      )}
    </div>
  );
};
 export default TaskList;