let common = {
    checkRules(formParams, rules) {
        for(let key in rules) {
            let arr = rules[key]
            for(let i = 0; i < arr.length; i++) {
                let rule = arr[i],
                    val = formParams[key] === 0 ? '0' : formParams[key] || ''
                if (rule.required && val === '') {
                    uni.showToast({
                        title: rule.message,
                        icon: 'none'
                    })
                    return false
                }
                if (rule.pattern && !rule.pattern.test(val)) {
                    uni.showToast({
                        title: rule.message,
                        icon: 'none'
                    })
                    return false
                }
            }
        }
        return true
    }
}
module.exports = common