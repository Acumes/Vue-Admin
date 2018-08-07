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
                        <el-form-item label="密码" prop="password">
                            <el-col :span="12">
                                <el-input type="password" v-model="userForm.password" v-if="!isEdit"></el-input>
                                <el-input type="password" v-model="userForm.password" v-if="isEdit">
                                    <template slot="append"><el-checkbox v-model="isEditPassword">修改密码</el-checkbox></template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-col :span="12">
                                <el-input  v-model="userForm.name" ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-col :span="12">
                                <el-input  v-model="userForm.email" ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="mobile">
                            <el-col :span="12">
                                <el-input   v-model="userForm.mobile" ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电话" prop="phone">
                            <el-col :span="12">
                                <el-input   v-model="userForm.phone" ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remarks">
                            <el-col :span="12">
                                <el-input type="textarea"  :rows="3" v-model="userForm.remarks" ></el-input>
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
                if(value != ''){
                    let params = {
                        loginName:this.userForm.loginName,
                        edit:this.isEdit,
                        userId:this.userId
                    }
                    api.checkUser(params).then(response => {
                        if(response.data){
                            callback(new Error());
                        }else{
                            callback();
                        }
                    })
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
                    password: '',
                    name: '',
                    email: '',
                    phone: '',
                    mobile: '',
                    remarks: ''
                },
                userules: {
                    loginName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {validator:checkUserName, message:'该用户名已存在，请修改用户名', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
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
                    this.userForm = {
                        loginName: res.data.loginName,
                        password: res.data.password,
                        mobile: res.data.mobile,
                        phone: res.data.phone,
                        name: res.data.name,
                        email: res.data.email,
                        remarks: res.data.remarks
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
                            params.id =this.$route.params.id;
                        }
                        api[functionName](params).then(result => {
                            console.log(result)
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.initData();
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
