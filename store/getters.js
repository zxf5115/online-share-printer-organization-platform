import store from '../store'
const getters = {
  userinfo    : state => state.user.userinfo || {}, // 用户数据
  open_id     : state => state.user.openid  || void 0, // 微信的open_id
  token       : state => state.user.token  || void 0, // token
  asset       : state => state.user.asset,
  isLogin     : state => !!state.user.token, // 已登录状态
  hasUserinfo : state => ((state.user.userinfo.avatar||'').length && (state.user.userinfo.nickname||'').length), // 已经设置了用户信息
}
export default getters
