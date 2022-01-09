export default { // 这里的this指向会变成Request类
    list(params) {
        return this.get('organization/withdrawal/list', { params });
    },
    view(id) {
        return this.get(`organization/withdrawal/view/${id}`);
    }
};