/*
 * 自动化校验类 
 * @version: V1.0
 * @Author: 王博然 
 * @Date: 2020-06-17 15:30:24 
 * @Last Modified by: 王博然
 * @Last Modified time: 2021-02-07 11:09:36
 */
 /**
  * 使用方法:
  * 该工具调用方式为链式调用。
  * 引入实例:
  * 根据rule规则校验:
  * validate.module(api).check(data).rule('length:1-20|require');
  * module入参规则:
  * module入参一种是传入api对象，如果当前模块api未被装载过，则装载并返回module
  * module入参也可以传入字符串，会返回对应name字段的module，如果未被装载过会返回null
  * rule入参规则:
  * ":"前的为校验方法名，":"后的为校验参数，多重校验使用"|"进行分割。
  * 使用"-"分割的参数会被编译成数组入参，使用","分割的参数会被编译成多个入参调用方法/函数。
  * 例:"test:1-2,a,b,c,d" ==> test([1,2],a,b,c,d)
  * ruleKey传入模块API中对应的rule key，会按照对应的rule value对数据进行验证，验证方式与rule入参一致。
  * scene入参规则:
  * 传入对应的sceneKey 则会对scene对应的rule数组进行遍历校验。
  * 检验提示语句请使用Validate.message进行读取。
  */
// 默认验证类的api名字，冲突自行更改
const defaultName = "default_validate";
// 验证类主体
class Validate {
    #loadDefaultModule;
    check;rule;scene;methods;message;
    constructor() {
        this.modules     = {};
        this.defaultName = defaultName;
        // 装载default模块
        this.loadDefaultModule();
        // 映射一下获取rule/scene/methods
        Object.defineProperty(this, 'rule'   , {get(){return this.module(this.defaultName).rule   },set(value){}});
        Object.defineProperty(this, 'scene'  , {get(){return this.module(this.defaultName).scene  },set(value){}});
        Object.defineProperty(this, 'methods', {get(){return this.module(this.defaultName).methods},set(value){}});
        Object.defineProperty(this, 'check'  , {
            get(){ // 这里必须要改变指向，不然的话会造成module中获取到的是Validate实例。
                return (...args) => {
                    return this.module(this.defaultName).check.apply(this.module(this.defaultName), args);
                };
            },set(value){}});
        Object.defineProperty(this, 'message', {
                get(){
                    if (!this._message) this._message = '';
                    return this._message;
                },set(value){
                    if (value != this._message) {
                        this._message = value;
                    }
                }
            }
        );
    }
    // 装载模块
    loadModules (apis = []) {
        apis.forEach( e => {
            this.module(e);
        });
    }
    module (api = {}) {
        let name;
        if (Object.prototype.toString.call(api) === "[object Object]") {
            if (!api.name) {
                console.log('无法装载的api', api);
                return null;
            }
            name = api.name;
            if (!this.modules[api.name]) {
                // 不存在的话直接来创建
                let module = new ValidateModule(api, this);
                this.modules[api.name] = module;
            }
        } else if (Object.prototype.toString.call(api) === "[object String]") {
            name = api;
            if (!name || !this.modules[name]) {
                console.log('不存在的校验模块');
                return null;
            }
        } else {
            console.log('传入了错误的API');
            return null;
        }
        return this.modules[name];
    }
    loadDefaultModule() {
        let api = defaultAPI;
        this.module(api);
    }
}
class ValidateModule {
    constructor (api = {}, response) {
        this.response = response;
        // 创建ValidateMethods类
        Object.defineProperty(this, 'methods', {
                get(){
                    if(!this._methods) {
                        this._methods = new ValidateMethods(this);
                    }
                    return this._methods;
                },
                set(value) {},
            }
        );
        // 为api的methods填充默认方法
        api.methods = Object.assign(defaultAPI.methods, api.methods);
        // 装载api对象
        this.methods.registerMethods(api.methods||{});
        // 映射
        Object.defineProperty(this, 'api_rule', {
            get()      {return api.rule||{}},
            set(value) {},
        });
        Object.defineProperty(this, 'api_message', {
            get()      {return api.message||{}},
            set(value) {},
        });
        Object.defineProperty(this, 'api_scene', {
            get()      {return api.scene||{}},
            set(value) {},
        });
    }
    check(data) { //
        let check = function (data) {
            let that = this;
            return {
                ruleKey (ruleKey) {
                    let rule = that.api_rule[ruleKey]||'';
                    return that.rule(data, rule, undefined, ruleKey);
                },
                rule (rule) {
                    return that.rule(data, rule);
                },
                scene (scene) {
                    return that.scene(data, scene);
                },
            };
        }
        return check.apply(this, [data]);
    }
    rule(data, rule = '', scene = undefined, ruleKey = undefined) {
        if((!rule || rule.length == 0) && !ruleKey) {
            console.log('无效的规则', rule);
            return;
        }
        // rule
        let ruleArr = rule.split('|');
        for (const key in ruleArr) {
            if (ruleArr.hasOwnProperty(key)) {
                const a = ruleArr[key];
                if (a.length == 0) {
                    console.log('读取到了无效的校验方法，请检查。');
                    continue;
                }
                let action = a.split(':');
                if (!this.executeAction(data, action)) {
                    let message = this.api_message[(scene?scene+'.':'')+(ruleKey?ruleKey+'.':'')+action[0]]||'';
                    if(!this.methods.require(message)) message = this.api_message[(ruleKey?ruleKey+'.':'')+action[0]]||'';
                    if(!this.methods.require(message)) message = this.api_message[action[0]]||'';
                    this.response.message = message;
                    return false;
                }
            }
        }
        return true;
    }
    scene(data, scene) {
        if (!this.api_scene[scene]) {
            console.log('不存在的校验场景:' + scene);
            return true;
        }
        for (const key in this.api_scene[scene]) {
            if (this.api_scene[scene].hasOwnProperty(key)) {
                const e = this.api_scene[scene][key];
                let result = this.rule(data[e]||null, this.api_rule[e], scene, e);
                if (!result){
                    return false;
                } 
            }
        }
        return true;
    }
    executeAction(data, action) {
        let actionName  = action[0];
        let actionParam = [data];
        if (action.length > 1) {
            // 这里来解析参数
            let paramStr    = action[1]||'';
            let params_s    = paramStr.split(',')||[];
            let params      = [];
            params_s.forEach(e => {
                let param = e.split('-');
                if (param.length <= 1)
                    param = e;
                params.push(param);
            });
            if (!this.methods.require(params)) params = [];
            actionParam = actionParam.concat(params);
        }
        if (this.methods.hasOwnProperty(actionName)) {
            return this.methods[actionName].apply(this, actionParam);
        }
        console.log('不存在方法:'+actionName+'  默认成功');
        return true;
    }
}
// 校验方法类
class ValidateMethods {
    constructor (response) {
        Object.defineProperty(this, 'response', {
            get()      {return response},
            set(value) {},
        });
    }
    registerMethods (methods = {}) {
        Object.keys(methods).forEach(key => {
            let action = methods[key];
            this.registerMethodsAction(key, action);
        });
    }
    registerMethodsAction (key, action) {
        Object.defineProperty(this, key, {
            get() {
                return (...args) => {
                    return action.apply(this.response, args);
                };
            },
            set(value) {},
        })
    }
}
const defaultAPI = {
    name: defaultName,
    methods : {
        // mark ------- 相等校验 -------
        equal (data1, data2) {
            return data1 === data2;
        },
        // mark ------- 包含在....中 -------
        in (data, ...args) {
            for (const key in args) {
                if (args.hasOwnProperty(key)) {
                    const e = args[key];
                    if (this.methods.equal(data, e)) return true;    
                }
            }
            return false;
        },
        // mark ------- 手机号或邮箱 -------
        phoneOrEmail (data) {
            return this.methods.phone(data) || this.methods.email(data);
        },
        // mark ------- 手机号校验 -------
        phone (data) {
            return (/^[0-9]*$/.test(data));
        },
        // mark ------- 邮箱校验 -------
        email (data) {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            return reg.test(data);
        },
        // mark ------- 是个字符串 -------
        isString (data) {
            return Object.prototype.toString.call(data) === "[object String]";
        },
        // mark ------- 是个数组 -------
        isArray (data) {
            return Object.prototype.toString.call(data) === "[object Array]";
        },
        // mark ------- 是个对象 -------
        isObject (data) {
            return Object.prototype.toString.call(data) === "[object Object]";
        },
        // mark ------- 含有英文 -------
        hasEn (data) {
            var regp =/^(?=.*[a-zA-Z]+)[a-zA-Z]+$/;
            return regp.test(data);
        },
        // mark ------- 含有数字 -------
        hasNumber (data) {
            return true;
            var regp =/^(?=.*[0-9]+)[0-9]+$/;
            return regp.test(data);
        },
        // mark ------- 必须数字 -------
        mustNumber (data) {
            return true;
            var regp =/^[0-9]*$/;
            return regp.test(data);
        },
         
        // mark ------- 含有数字和英文 -------
        numberAndEn (data) {
            var regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
            return regp.test(data);
        },
        // mark ------- 非空校验 -------
        require(data) {
            if(data === null || data === undefined) return false;
            if(this.methods.isArray(data) || this.methods.isString) return data.length > 0;
            if(this.methods.isObject(data)) return Object.keys(data).length > 0;
            return true;
        },
        // mark ------- url -------
        url(data) {
            let url = data;
            //url= 协议://(ftp的登录信息)[IP|域名](:端口号)(/或?请求参数)
            var strRegex = '^((https|http|ftp)://)?'//(https或http或ftp):// 可有可无
            + '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@  可有可无
            + '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
            + '|' // 允许IP和DOMAIN（域名） 
            + '(localhost)|'	//匹配localhost
            + '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
            + '\\w+\\.' // 一级域名 -英文或数字  加上.
            + '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文 
            + '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
            + '((/?)|' // url无参数结尾 - 斜杆或这没有
            + '(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$';//请求参数结尾- 英文或数字和[]内的各种字符
            var strRegex1 = '^(?=^.{3,255}$)((http|https|ftp)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/)?(?:\/(.+)\/?$)?(\/\w+\.\w+)*([\?&]\w+=\w*|[\u4e00-\u9fa5]+)*$';
            var re=new RegExp(strRegex,'i');//i不区分大小写
            console.log(re);
            //将url做uri转码后再匹配，解除请求参数中的中文和空字符影响
            if (re.test(encodeURI(url))) {
                return (true);
            } else {
                return (false);
            }
        },
        // mark ------- 长度校验 -------
        length (data, length) {
            if (length.length <  1) return true;
            if (length.length == 1) return data.length == length[0];
            if (!data || data.length < length[0] || data.length > length[1]) return false;
            return true;
        }
    }
}
const validate = new Validate();
const modulesFiles = require.context('./modules', true, /\.js$/)
// 分模块加载
const moduleArr = [];
modulesFiles.keys().forEach((modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    moduleArr.push(value.default)
}, {})
validate.loadModules(moduleArr);
export default {validate, Validate}