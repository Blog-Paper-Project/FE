import { Routes, Route } from "react-router-dom";

/* 컴포넌트 */
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyBlog from "./pages/MyBlog";
import MyWrite from "./pages/MyWrite";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Chatin from "./pages/Chatin";
import PostDetail from "./pages/PostDetail";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myblog/:userId" element={<MyBlog />} />
        <Route path="/mywrite" element={<MyWrite />} />
        <Route path="/detail/:userId/:postId" element={<PostDetail />} />
        <Route path="/paper/search/:payload" element={<Search />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatin" element={<Chatin />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </>
  );
}

export default App;
