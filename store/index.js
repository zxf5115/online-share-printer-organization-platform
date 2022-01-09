import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'  
import getters from './getters'

Vue.use(Vuex) // vue的插件机制
const modulesFiles = require.context('./modules', true, /\.js$/)

// 分模块加载
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    modules,
    getters,
    plugins: [  
        // 可以有多个持久化实例  
        createPersistedState({  
          reducer: state => ({ // 需要持久化存储的数据
            user: state.user,
          }),
          storage: {  // 存储方式定义  
            getItem: (key) => uni.getStorageSync(key), // 获取  
            setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
            removeItem: (key) => uni.removeStorageSync(key) // 删除  
          }
        })  
    ],
})

export default store
