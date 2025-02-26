export const contractAddress = '0xfB5F3793f3deC4931aeFfF0204bB38073Ef23730';
export const contractAbi = [
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