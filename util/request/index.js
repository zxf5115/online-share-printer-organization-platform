// 引入配置
import config from '@/common/config'
// 初始化请求配置
uni.$u.http.setConfig((defaultConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = process.env.API_URL /* 根域名 */
    return defaultConfig
})
// 定义一个简单调用
Object.defineProperty(uni, '$R', {
    get: function () {
        return uni.$u.http
    },
});

// api根据模块放置
Object.defineProperty(uni.$R, 'api', {
    get() {
        return function (moduleName) {
            try {
                let module = require(`./modules/${moduleName}.js`);
                const api = {};
                Object.keys(module.default).forEach(key => {
                    Object.defineProperty(api, key, {
                        get() {
                            return (...args) => { 
                                return module.default[key].apply(uni.$R, args, config);
                            };
                        }
                    })
                });
                return api;
            } catch (error) {
                throw new Error(`未定义的request模块${moduleName}.js`)
            }
            
        }
    }
})
Object.defineProperty(uni, '$api', {
    get() {
        return uni.$R.api;
    }
})

module.exports = {
    api: uni.$api,
    request: uni.$u.http,
    import: (vm, Vue) => {
        require('./requestInterceptors')(vm)
        require('./responseInterceptors')(vm)
        Vue.prototype.$api = uni.$api;
    }
}