import { Routes, Route } from "react-router-dom";

/* 컴포넌트 */
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyWrite from "./pages/MyWrite";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import PaperDetail from "./pages/PaperDetail";
import Reservation from "./pages/Reservation";
import Paper from "./pages/Paper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paper/:userId" element={<Paper />} />
        <Route path="/mywrite" element={<MyWrite />} />
        <Route path="/paper/:userId/:postId" element={<PaperDetail />} />
        <Route path="/paper/search/:payload" element={<Search />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
      </Routes>
    </>
  );
}

export default App;
