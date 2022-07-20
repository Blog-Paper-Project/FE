// kakao Login
const CLIENT_ID = process.env.REACT_APP_KAKAO_APP_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;

// google Login
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

// naver Login
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_ID;
const STATE_STRING = "";
const NAVER_REDIRECT_URI = "http://localhost:3000/oauth/naver/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=${STATE_STRING}`;
// export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${NAVER_REDIRECT_URI}`