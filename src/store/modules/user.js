import { login, logout, getdashTop } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response;
        console.log(data)
        //设置cookie
        // var exdate=new Date();//获取时间
        // exdate.setTime(exdate.getTime() + 24*60*60*1000*1);//保存的天数
        // //字符串拼接cookie
        // Cookies.set('uid', data.uid)
        // Cookies.set('key', data.key)
        // Cookies.set('username', data.username)
        // commit('SET_TOKEN', data.token)
        window.localStorage.setItem("token",data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  // getdashTop({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getdashTop.then((res) => {
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

