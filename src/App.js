import { Routes, Route, useNavigate } from "react-router-dom";

/* 컴포넌트 */
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyBlog from "./pages/MyBlog";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/paper/search/:payload" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
