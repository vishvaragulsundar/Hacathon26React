import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Sidebar from './componennts/layouts/Sidebar';
import Navbar from './componennts/layouts/Navbar';
import ChatPage from './page/ChatPage';
import ProfilePage from "page/ProfilePage";

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Sidebar />
      <main className="main">
        <Navbar />
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </main>
    </div>
  </BrowserRouter>
  );
}

export default App;
