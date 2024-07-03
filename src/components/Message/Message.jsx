import React from 'react';

const Message = ({ username, message, id_new }) => {
  const isAdmin = username === 'Admin';
  
  return (
    <div className={`message ${id_new}`}>
      <div 
        className={`p-3 rounded-lg shadow max-w-xs mb-4 
        ${isAdmin
        ?"bg-green-500 text-white" 
        : id_new === 'right' 
        ? 'bg-blue-500 text-white ml-auto' 
        : 'bg-gray-200'}`}
      >
        {username ? `${username} : ${message}` : `You : ${message}`}
      </div>
    </div>
  );
};

export default Message;
