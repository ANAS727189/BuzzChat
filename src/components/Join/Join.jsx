import React, { useContext, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import logo from "../../assets/bee.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const Join = () => {
  const { setUsername } = useContext(UserContext);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      setUsername(value);
      setValue("");
      navigate('/chat');
    } else {
      toast.error("You cannot leave avatar name field empty .");
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4'>
      <Toaster />
      <div className='flex items-center justify-center mb-10'>
        <img src={logo} alt='App-logo' className='w-20 h-20 mr-3 drop-shadow-lg' />
        <h1 className='text-4xl pl-2 font-extrabold text-white drop-shadow-lg'>Buzz<span className='text-7xl text-amber-400'>C</span>hat...</h1>
      </div>
      <form className='w-full max-w-xs' onSubmit={handleSubmit}>
        <input
          type='text'
          name='joinChat'
          id='joinChat'
          placeholder='Enter your avatar name'
          className='w-full max-w-xs p-4 border border-transparent rounded-md mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-lg transition duration-200'
          value={value}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className='w-full py-3 rounded-full bg-white text-purple-600 font-semibold text-lg hover:bg-purple-700 hover:text-white transition duration-200 transform hover:scale-105 shadow-lg'
        >
          Enter the Chat
        </button>
      </form>
    </div>
  );
};

export default Join;
