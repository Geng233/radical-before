import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    screenWidth: document.documentElement.clientWidth, //屏幕宽度
    screenHeight: document.documentElement.clientHeight, //屏幕高度
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO: (state) => {
      state.token = '';
      state.userInfo = {};
      localStorage.setItem("token", '');
      localStorage.setItem("userInfo", JSON.stringify(''))
    }
  },
  getters: {
    getUser: state => {
      return state.userInfo;
    },
    getToken: state => {
      if (state.token == null) {
        // 第一次登陆
        return '';
      } else {
        return state.token;
      }
    }
  },
  actions: {

  },
  modules: {

  }
})
