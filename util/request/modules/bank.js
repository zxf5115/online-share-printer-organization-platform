export default { // 这里的this指向会变成Request类
    handle(params) {
        return this.post('organization/bank/handle', params);
    },
    data() {
        return this.get('organization/bank/data');
    },
    handle(params) {
        return this.post('organization/bank/handle', params);
    },
    delete(id) {
        return this.post('organization/bank/delete', {id});
    },
    list() {
        return this.get('common/bank/list');
    }
};