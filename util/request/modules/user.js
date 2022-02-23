import config from '@/common/config.js'
export default { // 这里的this指向会变成Request类
    // 这个是微信小程序操作
    async login(...args) {
        let code = await this.api('user').wxLogin();
        // return console.lo
        // 获取code openid错误 返回个空指针
        if (!code) return void 0;
        return this.post('weixin_login', {code, ...(args[0]||{})});
    },
    async wxLogin() {
        return new Promise((resolve, reject) => {
            uni.login({
                provider: 'weixin',
                success: res => {
                    resolve(res.code)
                },
                fail: err => {
                    reject(void 0);
                }
            })
        })
    },
    setUserinfo(userinfo) {
        return this.post('organization/handle', userinfo);
    }
};