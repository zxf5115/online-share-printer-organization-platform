import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);
import mixin from './common/mixin'
// 验证类
import Validate from './util/validate/index'
Vue.prototype.$validate = Validate.validate;

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'
// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
require('./util/request/index').import(app, Vue)
// vuex
import store from './store'

app.$mount()
