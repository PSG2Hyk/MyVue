import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:"",
    mail:"",
    foundList:""
  },
  mutations: {
    UserSave(state,obj){
      state.name = obj.name;
      state.mail = obj.mail;
    },
    FoundList(state,obj){
      state.foundList = obj;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createVuexAlong()]
})
