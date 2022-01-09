export default { // 这里的this指向会变成Request类
    getSubLevelObtain(params) {
        return this.get('organization/obtain', {params});
    },
    // subordinate(params) {
    //     return this.get('organization/subordinate', {params});
    // },
    data(params) {
        return this.get('organization/obtain/data', {params});
    }
};