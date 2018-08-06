import Api from "../config/axios";

export default {
    /**
     * 用户登录
     */
    login(params) {
        return Api.post('/auth/token?username='+ params.userName + '&password=' + params.password, params);
    },
    /**
     * 获取用户详情
     */
    getUserInfo(id){
        return Api.get('/mms/users/detail/' + id);
    },
    /**
     * 删除用户
     */
    delUser(id){
        return Api.delete('/mms/users/delete/' + id);
    },
    /**
     * 批量删除用户
     */
    batchDelUser(ids){
        return Api.delete('/mms/users/batchDelete?ids=' + ids);
    },
    /**
     * 获取用户列表
     */
    getUserList(data){
        return Api.post('/mms/users/getUserList',data);
    },
    /**
     * 修改用户
     */
    editUser(data){
        return Api.put('/mms/users/to_add/update',data);
    },
    /**
     * 添加用户
     */
    addUser(data){
        return Api.post('/mms/users/to_add/save',data);
    },
    /**
     * 获取日志列表
     */
    getLogList(data){
        return Api.post('/mms/log/getLogList',data);
    },
    getAdminInfo(){
        return Api.get('/users/getCurrentUser')
    },
    /**
     *获取日志成功失败数
     */
    getLogCount(){
        return Api.get('/mms/log/getLogCount');
    },
    /**
     * 获取统计图表
     */
    getLogStatustucs(data){
        return Api.post('/mms/log/getLogStatustucs', data);
    },
    /**
     * 获取客户编码列表
     */
    getCustomers(){
        return Api.get('/mms/users/getCustomers');
    },
    /**
     * 获取日志列表
     */
    getLogListGroupByFunction(data){
        return Api.post('/mms/log/getLogListGroupByFunction',data);
    },
    /**
     * 校验用户名与公司是否存在
     */
    checkUser(data){
        return Api.post('/mms/users/checkUser',data);  
    }

}
