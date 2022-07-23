import { Routes, Route } from "react-router-dom";

/* 컴포넌트 */
import Login from "./pages/Login/Login";
import Main from "./pages/Main";
import Write from "./pages/Write";
import Modify from "./pages/Modify";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp/SignUp";
import SocialSignUp from "./pages/SignUp/SocialSignUp";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import PaperDetail from "./pages/PaperDetail";
import Reservation from "./pages/Reservation";
import ReservationList from "./pages/ReservationList";
import Paper from "./pages/Paper";
import Kakao from "./pages/Login/Kakao";
import Google from "./pages/Login/Google";
import Naver from "./pages/Login/Naver";

// import io from "socket.io-client";

// export const socket = io.connect(process.env.REACT_APP_API_URL);
// export const initSocketConnection = () => {
//   if (socket) return;
//   socket.connect();
// };

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/socialsignup" element={<SocialSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/login/kakao/callback" element={<Kakao />} />
        <Route path="/user/login/google/callback" element={<Google />} />
        <Route path="/user/login/naver/callback" element={<Naver />} />
        <Route path="/write" element={<Write />} />
        <Route path="/modify/:blogId/:postId" element={<Modify />} />
        <Route path="/paper/:blogId" element={<Paper />} />
        <Route path="/paper/:blogId/:postId" element={<PaperDetail />} />
        <Route path="/paper/search/:payload" element={<Search />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/chat/:hostId/:guestId" element={<Chat />} />
        <Route path="/paper/:blogId/reservation" element={<Reservation />} />
        <Route
          path="/paper/:blogId/reservationList"
          element={<ReservationList />}
        />
        <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
      </Routes>
    </>
  );
}

export default App;
