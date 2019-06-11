import Vue from 'vue'
import Vuex from 'vuex'

import shopCar from './moudules/shopCar'
import seller from './moudules/seller'
import Router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户信息
    userInfo: {},
    // 是否登录
    isLogin: localStorage.getItem('userInfo' || '[]') == null
      ? false
      : true,
    // 搜索关键字
    keyWord: '',
    // 搜索框下方热门商品关键字
    hotProList: [],
    // 用户头像图片
    userHeadfilePath: null,
    // 用户未读消息条数
    unreadMsgCount: 0
  },
  getters: {
    getUserHeadfilePath: state => {
      return state.userHeadfilePath
    },
    getUserUnreadMsgCount: state => {
      return state.unreadMsgCount
    }
  },
  mutations: {
    // 存储用户信息
    saveuserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.isLogin = true
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      Router.push({name: 'index'})
    },
    saveUserHeadfilePath(state, path) {
      state.userHeadfilePath = path
    },
    saveUnreadMsgCount(state, count) {
      state.unreadMsgCount = count
    }
  },
  actions: {},
  modules: {
    seller,
    shopCar
  }
});
