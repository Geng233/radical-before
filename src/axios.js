import axios from "axios";
import router from './router'
import { Message } from 'element-ui';

axios.defaults.baseURL = 'http://localhost:8060';

//前置拦截(不进行)
axios.interceptors.request.use(config => {
  return config;
});


//后置拦截
axios.interceptors.response.use(response => {

  let res = response.data;
  if (res.code == 200) {
    return response;
  } else if (res.code == 401) {
    Message.error(res.message, {duration: 3*1000});
    router.push('login');
    return Promise.reject(res.message);
  } else {
    Message.error(res.message, {duration: 3 * 1000});
    return Promise.reject(res.message);
  }
});
