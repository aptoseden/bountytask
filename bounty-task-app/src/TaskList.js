
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Web3 from 'web3';
import {contractAddress, contractAbi} from './abi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [comment, setComment] = useState('');
  let [currentPage, setcurrentPage] = useState('1');
  
  // 发布任务 弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskReward, setTaskReward] = useState('');

  // Connect to Metamask
async function connectToMetamask() {
  if (window.ethereum) {
    await window.ethereum.enable();
    const provider = new Web3(window.ethereum);
    //const provider = await detectEthereumProvider();
    return provider;
  } else {
    console.log('Please install Metamask');
  }
}

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenStatusModal = () => {
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  const handlePrevious = () => {
    if(currentPage > 1) {
      let page = parseInt(currentPage, 10) - 1;
      setcurrentPage(page);
    }
  };

  const handleNext = () => {
    let page = parseInt(currentPage, 10) + 1;
    setcurrentPage(page);
  };

  
  

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    // 处理任务提交逻辑
    try {
      // Connect to Metamask
      const provider = await connectToMetamask();
      const account = await provider.eth.getAccounts();
      const accountAddress = account[0];
      console.log(accountAddress);
      // Create a contract instance
      const contract = new provider.eth.Contract(contractAbi, contractAddress);
      
      console.log("name:", taskName, ",bonus:", taskReward);

      // Call the "setGreeting" function in the contract
      await contract.methods.issue(taskName, taskReward).send({ from: accountAddress});
      //tx.wait();
      // 刷新任务列表
      loadTasks();
      // 关闭弹出框
      //setSelectedTask(null);
      //setNewStatus('');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
    // 关闭弹出框
    handleCloseModal();
    setTaskName("")
    setTaskReward("")
  };

  useEffect(() => {
    loadTasks();
  }, );
  
  const getStatus = (s) => {
    if(s === "0") {
      return "已发布";
    } else if (s === "1") {
      return "已接受";
    } else if (s === "2") {
      return "已提交";

    } else if (s === "3") {
      return "已完成";
    }
    return "未知状态";
  }

   const loadTasks = async () => {
    // Connect to Metamask
    const provider = await connectToMetamask();
    //const account = await provider.eth.getAccounts();
    //  const accountAddress = account[0];
      console.log("page:", currentPage);
    // Create a contract instance
    const contract = new provider.eth.Contract(contractAbi, contractAddress);
    // 获取任务数量
    const page = parseInt(currentPage, 10);
    const taskss = await contract.methods.getTasksByPage(page).call();

    // 获取每个任务的详细信息
    const tasks = [];

    for (let i = 0; i < taskss.length; i++) {
      let task = {};
      const current = taskss[i];
      task.id = i;
      task.issuer = current.issuer;
      task.hunter = current.worker;
      task.reward = current.bonus;
      task.name = current.desc;
      task.status = current.status;
      task.comment = current.comment;
      task.timestamp = formatTimestamp(Number(current.timestamp.toString()) * 1000);
      //console.log("task:", i, task);
      tasks.push(task);
    }
    // 更新任务列表
    setTasks(tasks);
  };
   const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      // Connect to Metamask
      const provider = await connectToMetamask();
      const account = await provider.eth.getAccounts();
      const accountAddress = account[0];
      // Create a contract instance
      const contract = new provider.eth.Contract(contractAbi, contractAddress);
      
      console.log("get:", newStatus);
      if (newStatus === "1") {
        await contract.methods.take(selectedTask).send({ from: accountAddress });
      } else if (newStatus === "2") {
        await contract.methods.commit(selectedTask).send({ from: accountAddress });
      } else if (newStatus === "3") {
        await contract.methods.confirm(selectedTask, comment, 3).send({ from: accountAddress });
      } else if (newStatus === "4") {
        await contract.methods.confirm(selectedTask, comment, 4).send({ from: accountAddress });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }

    handleCloseStatusModal();
  };

  const buttonStyle = {
    backgroundColor: 'blue', // 设置背景颜色
    color: 'white', // 设置文字颜色
    padding: '10px 20px', // 设置内边距
    border: 'none', // 移除边框
    fontSize: '16px', // 设置文字大小
    cursor: 'pointer', // 设置鼠标样式为手型
  };

  const buttonStatusStyle = {
    backgroundColor: 'orange', // 设置背景颜色
    color: 'white', // 设置文字颜色
    padding: '10px 20px', // 设置内边距
    border: 'none', // 移除边框
    fontSize: '16px', // 设置文字大小
    cursor: 'pointer', // 设置鼠标样式为手型
  };


  function formatTimestamp(timestamp) {

    const date = new Date(timestamp);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('zh-CN', options);
  }
   return (
    <div>
      <div>
    <h1>任务列表</h1>
    <button style={buttonStyle} onClick={handleOpenModal}>发布任务</button>
    <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} ariaHideApp={false}>
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
    <table border="1">
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
            <td>{task.reward.toString()}</td>
            <td>{task.issuer}</td>
            <td>{task.hunter}</td>
            <td>{task.timestamp.toString()}</td>
            <td>{task.comment}</td>
            <td>{getStatus(task.status.toString())}</td>
            <td>
              <button style={buttonStatusStyle} onClick={() => {setSelectedTask(task.id);handleOpenStatusModal();}}>修改状态</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isStatusModalOpen && (
      <div>
        <Modal isOpen={isStatusModalOpen} onRequestClose={setIsStatusModalOpen} ariaHideApp={false}>
          <h2>修改任务状态</h2>
            <form onSubmit={handleUpdateStatus}>
              <label>
                新状态：
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} >
                  <option value="1">接受任务</option>
                  <option value="2">提交任务</option>
                  <option value="3">确认任务</option>
                  <option value="4">退回任务</option>
                </select>
              </label>
              <label>
                任务评价:
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
              </label>
              <button type="submit">提交</button>
              <button onClick={handleCloseStatusModal}>取消</button>
            </form>
        </Modal>
        
      </div>
    )}
    </div>
      <div>
        <button onClick={handlePrevious}>上一页</button>
        <button onClick={handleNext}>下一页</button>
      </div>
    </div>
    
  );

};
 export default TaskList;