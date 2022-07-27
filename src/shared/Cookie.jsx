const getCookie = (name) => {
  // 쿠키 값을 가져옵니다.
  let value = "; " + document.cookie;
  // 키 값을 기준으로 파싱합니다.
  let parts = value.split("; " + name + "=");
  // value를 return!
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

// 쿠키에 저장하는 함수
const setCookie = (name, value, exp) => {
  let date = new Date();
  // 날짜를 만들어줍니다.
  date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  // 저장!
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// 만료일을 예전으로 설정해 쿠키를 지웁니다.
const deleteCookie = (name) => {
  let date = new Date("2019-01-01").toUTCString();
  document.cookie = `${name} =; expires= ${date}; path=/`;
};

export { getCookie, setCookie, deleteCookie };
