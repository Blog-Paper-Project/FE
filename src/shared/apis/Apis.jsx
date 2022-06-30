import axios from "axios";
/* axios instance */
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
/*아래 예시 */
// const apis = {
//  login : (data) => api.post('/api/login', data),
// };
export default api;