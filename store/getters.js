import store from '../store'
const getters = {
  userinfo  : state => state.user.userinfo || {}, // 用户数据
  open_id   : state => state.user.open_id  || void 0, // 微信的open_id
  isLogin   : state => state.user.open_id && state.user.userinfo, // 已登录状态
}
export default getters
