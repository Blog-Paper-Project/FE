// 1. 깃헙에 올릴 때 api key 안 올라가게 유의 할 것.
// 2. 아직 정확히 어떻게 올려야하는지 모름 ( 깃헙 push 할 시 일단 팀원에게 먼저 얘기하자.)
import axios from "axios";

/* axios instance */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/*아래 예시 */
// const apis = {
// 	login : (data) => api.post('/api/login', data),
// };

export default api;

/*다른 페이지에서 사용시 예제*/
//  const getCommentdata = async () => {
//     const commentData = await apis.getComments(id);
//     dispatch(loadCommentJson(commentData.data.body));
//     // console.log(commentData.data.body);
//     setComment(commentData.data.body);
//   };

/*위의  baseURL 때문에 각 페이지에서 주소 저기 부터 시작한다. ( 이게 더 페이지 봤을 때 이해 잘 되고 좋을듯.) */
// const { data } = await axios.get('/api/data')

/*지난 주 싸이월드 과제 login 페이지에 post로 mutate 방법. (동일하게 함수 먼저 만들고-> 34번 라인과 같다. )*/
// const loginTester = async(userData) => {
//     const loginUserState = await apis.login(userData);
//     return loginUserState;
//   };

//   const { mutate } = useMutation(loginTester(요놈 함수 이름임),{ 옵션 })
