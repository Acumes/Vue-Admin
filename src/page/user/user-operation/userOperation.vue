<template>
    <div>
        <head-top></head-top>
        <div class="div_container">
            <el-form :model="userForm" :rules="userules" ref="userForm" label-width="110px" class="form food_form form_container">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="loginName">
                            <el-col :span="12">
                                <el-input v-model="userForm.loginName"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="userPassword">
                            <el-col :span="12">
                                <el-input type="password" v-model="userForm.userPassword" v-if="!isEdit"></el-input>
                                <el-input type="password" v-model="userForm.userPassword" v-if="isEdit">
                                    <template slot="append"><el-checkbox v-model="isEditPassword">修改密码</el-checkbox></template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公司" prop="companyId">
                            <el-col :span="12">
                                <el-input  v-model="userForm.companyId" :maxlength="6"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户" prop="customerId">
                            <el-col :span="12">
                                <el-input   v-model="userForm.customerId" ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户类型" prop="userType">
                            <el-col :span="12">
                                <el-select v-model="userForm.userType" placeholder="请选择" size="medium" style="width: 100%">
                                    <el-option
                                        v-for="item in usersType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="系统身份类型" prop="osIdentityType">
                            <el-col :span="12">
                                <el-select v-model="userForm.osIdentityType" clearable  placeholder="请选择" size="medium" style="width: 100%">
                                    <el-option
                                        v-for="item in osIdentitysType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="系统类型" prop="osType">
                            <el-col :span="12">
                                <el-select v-model="userForm.osType" clearable  placeholder="请选择" size="medium" style="width: 100%">
                                    <el-option
                                        v-for="item in ossType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="addUser('userForm')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import headTop from '@/components/headTop';
    import {usersType, ossType, osIdentitysType} from '@/api/contants';
    import api from '@/api/getData';
    export default {
        data(){
            /* 自定义表单校验 */
            var checkUserName = (rule, value, callback) => {
                let a = this.userForm.companyId;
                if(value !== ''){
                    let params = {
                        loginName:this.userForm.loginName,
                        companyId:this.userForm.companyId,
                        edit:this.isEdit,
                        userId:this.userId
                    }
                    api.checkUser(params).then(response => {
                        if(response.isExist){
                            callback(new Error());
                        }
                    }).catch(oError => {

                    });
                    
                }{
                    callback();
                }
            };
            return {
                categoryForm: {
                    categoryList: [],
                    categorySelect: '',
                    name: '',
                    description: '',
                },
                userForm: {
                    loginName: '',
                    userPassword: '',
                    userType: '',
                    osIdentityType: '',
                    osType: '',
                    companyId: '',
                    customerId: ''
                },
                userules: {
                    loginName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {validator:checkUserName, message:'该用户名与公司编码已存在，请修改用户名或者公司编码', trigger: 'blur'}
                    ],
                    userPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    userType: [
                        { required: true, message: '请选择用户类型', trigger: 'blur' },
                    ],
                    companyId: [
                        { required: true, message: '请输入公司编码', trigger: 'blur' },
                    ],
                    customerId: [
                        { required: true, message: '请输入客户编码', trigger: 'blur' },
                    ],
                    osType: [
                        { required: true, message: '请选择系统身份类型', trigger: 'blur' },
                    ],
                    osIdentityType: [
                        { required: true, message: '请选择系统类型', trigger: 'blur' },
                    ]
                },
                usersType,
                osIdentitysType,
                currentPage4: 4,
                ossType,
                isEdit: false,
                isEditPassword: false,
                userId:''
            }
        },
        activated: function(){
            this.initData();
        },
        deactivated: function(){

        },
        components: {
            headTop,
        },
        created(){
            this.initData();
        },
        computed: {
            selectValue: function (){
                return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
            }
        },
        methods: {
            async initData(){
                try{
                    this.clearData();
                    this.isEdit = this.$route.fullPath.indexOf('edit') >= 0;
                    if(this.isEdit){
                        this.getUserInfo();
                    }
                }catch(err){
                    console.log(err)
                }
            },
            clearData(){
                this.userForm = {
                    loginName: '',
                    userPassword: '',
                    userType: '',
                    osIdentityType: '',
                    osType: '',
                    companyId: '',
                    customerId: ''
                }
            },
            getUserInfo(){
                this.userId = this.$route.params.id;
                api.getUserInfo(this.userId).then(res => {
                    if(res.success){
                        this.userForm = {
                            loginName: res.loginName,
                            userPassword: res.userPassword,
                            userType: res.userType,
                            osIdentityType: res.osIdentityType,
                            osType: res.osType,
                            companyId: res.companyId,
                            customerId: res.customerId
                        }
                    }else{
                        console.log(res)
                    }
                }).catch(error => {
                })

            },
            addUser(userForm){
                this.$refs[userForm].validate((valid) => {
                    if (valid) {
                        const loading = this.$loading({
                            lock: true,
                            text: '正在提交',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.8)'
                        });
                        setTimeout(() => {
                            loading.close();
                        }, 2000);
                        const params = {
                            ...this.userForm
                        }
                        let functionName = this.isEdit ? 'editUser' : 'addUser';
                        if (this.isEdit) {
                            params.isEditPassword = this.isEditPassword;
                            params.guid = parseInt(this.$route.params.id);
                        }
                        api[functionName](params).then(result => {
                            if (result.success) {
                                console.log(result)
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.initData();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: result.errors
                                });
                            }
                        }).catch(oError => {
                            console.log(oError)
                        })
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../../../style/common';
    .div_container{
        margin: 20px;
        border: 1px solid #d0c8c8;
    }
    .form_container{
        padding-top: 10px;
    }
    .pagination_container{
        margin-bottom: 10px;
        margin-top: 10px;
        float: right;
    }
</style>
