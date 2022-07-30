import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, exp = 24) => {
  cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + exp * 60 * 60 * 1000),
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name, { path: "/" });
  // let date = new Date("2020-01-01").toUTCString();
  // document.cookie = name + "=; expires=" + date;
};
