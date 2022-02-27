import store from '../store'
const getters = {
  userinfo    : state => state.user.userinfo || {}, // 用户数据
  open_id     : state => state.user.openid  || void 0, // 微信的open_id
  token       : state => state.user.token  || void 0, // token
  asset       : state => state.user.asset,
  isLogin     : state => !!state.user.token, // 已登录状态
  hasUserinfo : state => !!(Object.keys(state.user.userinfo).length), // 已经设置了用户信息
  hasBank     : state => state.user.bank && !!Object.keys(state.user.bank).length,
  bankList    : state => state.user.bankList,
  bank        : state => { // 当前银行
    if (Object.keys(state.user.bank).length <= 0) return {};
    let bank        = JSON.parse(JSON.stringify(state.user.bank));
    bank.number     = '';
    bank.lastNumber = '';
    let index       = 1;
    // 设置提现展数据
    for(let char of bank.card_no){
      let n = char;
      // 最后四位
      bank.lastNumber += (bank.card_no.length - index) < 4 ? n : '';
      // 展示密文
      if ((bank.card_no.length - index) > ((bank.card_no.length % 4) || 4)) n = '*';
      console.log(index, n);
      let append = index % 4 == 0 ? '　' : '';
      bank.number += n + append;
      index ++;
    }
    // 获取银行信息
    state.user.bankList.forEach(e => {
      if (e.name === bank.open_bank_name) {
        bank = {...bank, ...e};
      }
    });
    return bank;
  }
}
export default getters
