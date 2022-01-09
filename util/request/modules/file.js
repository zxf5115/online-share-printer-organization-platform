export default { // 这里的this指向会变成Request类
    picture(file, params) {
        
        return this.upload('file/picture', {
            params: params, /* 会加在url上 */
            filePath: file, // 要上传文件资源的路径。
            // #ifdef MP-ALIPAY
            fileType: 'image', // 仅支付宝小程序，且必填。
            // #endif
            custom: {loading: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
            name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        })
    },
};