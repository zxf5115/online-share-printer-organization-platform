export default { // 这里的this指向会变成Request类
    // 这个是微信小程序操作
    login() {
        uni.login({
            provider: 'weixin',
            success: res => {
                console.log(res.code);
            },
            fail: err => {
                console.log('登录失败：', err)
            }
        })
        return this.post('weixin_login', {'open_id':'111'});
    },
};