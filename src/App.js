import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatProvider from './context/ChatProvider';

function App() {
  return (
    <ChatProvider>
      <div className='app'>
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/chats' element={<ChatPage />} />  
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
