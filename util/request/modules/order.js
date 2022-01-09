export default { // 这里的this指向会变成Request类
    view(id) {
        return this.get(`organization/order/view/${id}`);
    },
};