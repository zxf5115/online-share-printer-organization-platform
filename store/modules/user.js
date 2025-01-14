import { api } from '@/util/request/index'
const state = {
  /**
   * id	Number	会员编号
   * role_id	Number	角色编号 1会员 2店长 3分销商
   * open_id	Number	微信编号
   * parent_id	Number	上级分销商编号
   * level	Number	分销商级别
   * another_name	String	分销商别称
   * avatar	String	会员头像
   * username	String	登录账户
   * nickname	String	会员昵称
   */
  userinfo: {},
  openid: void 0,
  token: void 0,
  bank: void 0, // 银行卡信息
  bankList: [], // 银行卡列表
  asset: {}, // 供销商资产
}

const mutations = {
  SET_OPENID    : (state, openid)   => state.openid   = openid,
  SET_USERINFO  : (state, userinfo) => state.userinfo = userinfo,
  UPDATE_USERINFO  : (state, userinfo) => {
    state.userinfo = Object.assign(state.userinfo, userinfo);
  },
  SET_TOKEN     : (state, token)    => state.token    = token,
  SET_ASSET     : (state, asset)    => state.asset    = asset,
  SET_BANK      : (state, bank)     => state.bank     = bank,
  SET_BANK_LIST : (state, bankList) => state.bankList = bankList,
  CLEAR_USERINFO: (state) => {
    Object.assign(state, {
      userinfo: {},
      openid: void 0,
      token: void 0,
      bank: void 0, // 银行卡信息
      bankList: [], // 银行卡列表
      asset: {}, // 供销商资产
    })
  }
}
const actions = {
  getBankInfo({ commit, state }){
    return new Promise((resolve, reject) => {
      api('bank').data().then(res => {
        commit('SET_BANK', res);
        resolve(res);
      }).catch(error => {
        console.log(error);
        reject(error);
      })
    })
  },
  login({ commit, state }, ...args) {
    return new Promise((resolve, reject) => {
      // 调用登录 这部分获取code部分在api请求内
      api('user').login(args[0]||{}).then(res => {
        // 设置用户基础数据
        commit('SET_USERINFO', res.user_info);
        commit('SET_OPENID', res.user_info.open_id);
        commit('SET_TOKEN', `Bearer ${res.token}`);
        resolve(res);
      }).catch(err => {
        reject(err)
      })
    });
  },
  clearUserinfo({commit, state}) {
    commit('CLEAR_USERINFO');
  },
  setUserinfo({ commit, state }, userinfo) {
    return new Promise((resolve, reject) => {
      api('user').setUserinfo(userinfo).then(res => {
        commit('UPDATE_USERINFO', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      }) 
    })
  },
  getBankList({commit, state}) {
    return new Promise((resolve, reject) => {
      api('bank').list().then(res => {
        commit('SET_BANK_LIST', res);
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  },
  getOrgAsset({commit, state}) {
    return new Promise((resolve, reject) => {
      api('asset').getOrgAsset().then(res => {
        commit('SET_ASSET', res);
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
