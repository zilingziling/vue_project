import { getWareList } from '../../api/warehouse'

const state = {
  data: [],
  name: '',
  avatar: ''
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },

}

const actions = {
  // user login
  getList({ commit }, p) {
    getWareList({...p}).then(response => {
        const { data } = response;
        console.log(data)
        //设置cookie
        // var exdate=new Date();//获取时间
        // exdate.setTime(exdate.getTime() + 24*60*60*1000*1);//保存的天数
        // //字符串拼接cookie
        // Cookies.set('uid', data.uid)
        // Cookies.set('key', data.key)
        // Cookies.set('username', data.username)
        commit('SET_DATA', data.list)
        resolve()
      }).catch(error => {
        reject(error)
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
  jishu({ commit, state }) {
    return new Promise((resolve, reject) => {
      jishu.then((res) => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

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

