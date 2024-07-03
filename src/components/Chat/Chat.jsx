import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from "../context/UserContext.jsx";
import socketIO from "socket.io-client";
import sendIcon from "../../assets/send.png";
import bee from "../../assets/bee.png";
import Message from '../Message/Message.jsx';
import ReactScrollToBottom from "react-scroll-to-bottom";
import backIcon from "../../assets/back2.png";
import { useNavigate } from 'react-router-dom';

const ENDPOINT =  import.meta.env.VITE_SERVER_URL;
let socket;

const Chat = () => {
  const { username } = useContext(UserContext);
  const socketRef = useRef(null);
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
   

    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected");
      setId(socket.id);
      if (username) {
       
        socket.emit("joined", { username });
      }
    });

    socket.on("welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.username}: ${data.message}`);
    });

    socket.on("userJoined", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.username}: ${data.message}`);
    });

    socket.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.username}, ${data.message}`);
    });

    return () => {
      
      if (socket) {
        socket.disconnect();
      }
    };
  }, [username]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.username, data.message, data.id);
    };

    socket.on("sendMessage", handleMessage);

    return () => {
      socket.off("sendMessage", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
     
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 flex items-center shadow-lg">
        <img src={bee} alt='app-logo' width={35} className="mr-2" />
        <h1 className="text-xl font-bold">BuzzChat</h1>
        <div className="ml-auto">
          <a className = "hover:cursor-pointer" onClick={() => navigate('/')}><img src={backIcon} alt='back-icon' width={35} /></a>
        </div>
      </div>
    
      <ReactScrollToBottom className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((item, i) => (
          <Message
            key={i}
            username={item.id === id ? "" : item.username}
            message={item.message}
            id_new={item.id === id ? "right" : "left"}
          />
        ))}
      </ReactScrollToBottom>
   
   
      <div className="bg-gray-100 p-4 flex items-center space-x-2 shadow-inner">
        <input
          type="text"
          id="chatInput"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button onClick={send} className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          <img src={sendIcon} alt="Send" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
