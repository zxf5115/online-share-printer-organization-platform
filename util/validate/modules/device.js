export default {
    name: "device",
    message: {
        'title.require'       : '打印机名称不可为空',
        'code.require'        : '打印机编号不可为空',
        'address.require'     : '打印机地址不可为空',
    },
    rule: {
        title   : 'require',
        code    : 'require',
        address : 'require',
    },
    scene : {
        add: ['code', 'title', 'address'],
    },
}