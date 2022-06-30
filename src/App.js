import { Routes, Route, useNavigate } from "react-router-dom";

/* 컴포넌트 */
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyBlog from "./pages/MyBlog";
import MyWrite from "./pages/MyWrite";
import SignUp from "./pages/SignUp";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/mywrite" element={<MyWrite />} />
      </Routes>
    </>
  );
}

export default App;
