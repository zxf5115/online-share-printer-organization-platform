export default { // 这里的this指向会变成Request类
    list(params) {
        return this.get('printer/list', {params});
    },
    view(id) {
        return this.get(`printer/view/${id}`);
    },
    add(params) {
        return this.post('organization/printer/first_step', params, {notShowToast: true});
    },
    second_step(printer_id) {
        return this.post('organization/printer/second_step', {printer_id});
    },
    third_step(printer_id) {
        return this.post('organization/printer/third_step', {printer_id});
    },
    delete(printer_id) {
        return this.post('organization/printer/delete', {printer_id});
    }
    
};