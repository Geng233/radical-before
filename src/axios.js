import axios from "axios";
import router from './router'
import { Message } from 'element-ui';

// axios.defaults.baseURL = 'http://1.117.46.82:80';
axios.defaults.baseURL = 'http://localhost:8060';

//保存Session携带Cookie
// axios.defaults.withCredentials = true;

//前置拦截(不进行)
axios.interceptors.request.use(config => {
  return config;
});


//后置拦截
axios.interceptors.response.use(res => {
  let res_data = res.data;
  const status = Number(res_data.code) || 200;
  const statusWhiteList = [400] || [];
  const message = res_data.message || 'Network error'; //后端返回的message

  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) {
    return Promise.reject(res);
  }

  //如果是401则跳转到登录页面
  if (status === 401) {
    router.push({ path: '/login' }); //并在这里做页面登出操作
  }
  if (status === 404) {
    router.push({ path: '/404' });
  }

  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message));
  }


  return res;
  // if (res.code == 200) {
  //   return response;
  // } else if (res.code == 401) {
  //
  //   Message.error(res.message, {duration: 3*1000});
  //   router.push('login');
  //   return Promise.reject(res.message);
  // } else {
  //   Message.error(res.message, {duration: 3 * 1000});
  //   return Promise.reject(res.message);
  // }
});
