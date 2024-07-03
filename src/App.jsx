import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import Join from './components/Join/Join.jsx';
import Chat from './components/Chat/Chat.jsx';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Join />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
