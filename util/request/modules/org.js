export default { // 这里的this指向会变成Request类
    subordinate(params) {
        return this.get('organization/subordinate', {params});
    },
    data({id}) {
        return this.get(`organization/data?id=${id}`);
    }
};