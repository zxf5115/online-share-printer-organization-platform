export default { // 这里的this指向会变成Request类
    handle(params) {
        return this.post('organization/bank/handle', params);
    },
    data() {
        return this.get('organization/bank/data');
    },
    handle(params) {
        return this.post('organization/bank/handle', params);
    }
};