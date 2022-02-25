import store from '@/store'
/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data||{}
        // 自定义参数
        const custom = response.config?.custom;
        // 超时或数据错误登出逻辑
        if(data.status === -101) {
            // 清除数据
            store.commit('user/CLEAR_USERINFO');
            // 这里跳登录页
            uni.reLaunch('/pages/login/index');
            return;
        }
        if (!custom.notCheck && data.status !== 200) { // 服务端返回的状态码不等于200，则reject()
            // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
            if (!custom.notShowToast) {
                uni.$u.toast(data.message||'未知错误');
            }
            // 如果需要catch返回，则进行reject 
            // TODO: 这里后面再改 困了 看看有没有办法捕捉到不实现catch的情况
            // if (custom?.catch) {
                return Promise.reject(data)
            // } else {
            //     // 否则返回一个pending中的promise
            //     return new Promise(() => { })
            // }
        }
        if (custom.responseAll)
            return data || {};
        else
            return data.data || {};
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
        return Promise.reject(response)
    })
}