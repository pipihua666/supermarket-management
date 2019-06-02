//添加自己的工具类函数-------------------------------------------------------
import Cookie from "js-cookie";

const user = 'user';

export function setCookie(value) {
    return Cookie.set(user, value);
}

export function getCookie() {
    return Cookie.get(user);
}

export function deleteCookie() {
    return Cookie.remove(user);
}