export default { // 这里的this指向会变成Request类
    getOrgAsset() {
        return this.get('organization/asset/data');
    },
    equipment() {
        return this.get('organization/asset/equipment');
    },
    withdrawal_handle(money) {
        return this.post('organization/withdrawal/handle', {money});
    }
    
    
};