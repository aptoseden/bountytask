
import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
import Modal from 'react-modal';
//import detectEthereumProvider from '@metamask/detect-provider';

import Web3 from 'web3';
//const Web3 = require('web3');

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  // 发布任务 弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const contractAddress = '0xE51Bd74150E43E390b24D9d461B7b6c0d3707701';
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "commit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_comment",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_status",
          "type": "uint8"
        }
      ],
      "name": "confirm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_bonus",
          "type": "uint256"
        }
      ],
      "name": "issue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "take",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_bonus",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        }
      ],
      "name": "TaskIssue",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getAllTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "worker",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "desc",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bonus",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "comment",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct TaskInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getOneTask",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "worker",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "desc",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bonus",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "comment",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct TaskInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_page",
          "type": "uint256"
        }
      ],
      "name": "getTasksByPage",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "worker",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "desc",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bonus",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "comment",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct TaskInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; 

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
  }, []);
  

   const loadTasks = async () => {
    // Connect to Metamask
    const provider = await connectToMetamask();
    const account = await provider.eth.getAccounts();
      const accountAddress = account[0];
      console.log("signer:", accountAddress);
    // Create a contract instance
    const contract = new provider.eth.Contract(contractAbi, contractAddress);
    // 获取任务数量
    const taskss = await contract.methods.getAllTasks().call();
    //console.log("len:", taskss.length);
    // for(let i = 0; i < taskss.length; i ++) {
    //   const task = taskss[i];
    //   //console.log(task.issuer);
    // }
    //console.log("all-list:", taskss);
    //const taskCount = 0;// = await contract.taskCount();
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
   const handleUpdateStatus = async () => {
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
      }
      // const transaction = await contract.updateStatus(selectedTask, newStatus);
      // const signedTransaction = await signer.signTransaction(transaction);
      // // 发送签名交易
      // await provider.sendTransaction(signedTransaction);
      // // 刷新任务列表
      // loadTasks();
      // // 关闭弹出框
      // setSelectedTask(null);
      // setNewStatus('');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  function formatTimestamp(timestamp) {

    const date = new Date(timestamp);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('zh-CN', options);

    
  }
   return (
    <div>
      <h1>任务列表</h1>
      <button onClick={handleOpenModal}>发布任务</button>
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
              <td>{task.reward.toString()}</td>
              <td>{task.issuer}</td>
              <td>{task.hunter}</td>
              <td>{task.timestamp.toString()}</td>
              <td>{task.comment}</td>
              <td>{task.status.toString()}</td>
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
