<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="button_container">
            <el-form  :model="searchForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户名">
                            <el-col :span="20">
                                <el-input v-model="searchForm.loginName" placeholder="请输入用户名"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <el-col :span="20">
                                <el-input v-model="searchForm.mobile" placeholder="请输入手机号码"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <el-select v-model="searchForm.enable" clearable placeholder="请选择用户状态" style="width: 80%">
                                <el-option
                                    v-for="item in userStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
                            <el-button  @click="resetSubmit">重置</el-button>
                            <!--<el-button type="success" @click="stillMore">更多</el-button>-->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="button_container">
            <el-row>
                <el-button plain size="small" @click="addUser">添加</el-button>
                <el-button plain size="small" @click="batchDelete">批量删除</el-button>
            </el-row>
        </div>
        <div class="table_container">
            <el-table
                ref="multipleTable"
                :data="tableData"
                :stripe="true"
                border
                highlight-current-row
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    property="checked_"
                    width="55">
                </el-table-column>
                <el-table-column
                  property="loginName"
                  label="用户名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="name"
                  width="220">
                </el-table-column>
                <el-table-column
                    property="email"
                    label="email">
                </el-table-column>
                <el-table-column
                    property="mobile"
                    label="mobile">
                </el-table-column>
                <el-table-column
                    property="phone"
                    label="phone">
                </el-table-column>
                <el-table-column
                    label="是否可用">
                    <template slot-scope="scope">
                        <div v-if="scope.row.enabled === '1'">
                            可用
                        </div>
                        <div v-else-if="scope.row.enabled === '0'">
                            不可用
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                        <el-button  @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: center;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50,100]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import api from '@/api/getData';
    import {usersType, userStatus} from '@/api/contants';
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                currentPage: 1,
                currentSize: 20,
                multipleSelection: [],
                searchForm: {
                    loginName: '',
                    mobile: '',
                    enable: '',
                },
                usersType,
                userStatus,
                total:0
            }
        },
    	components: {
    		headTop,
    	},
        // created(){
        //     debugger
        //     this.initData();
        // },
        activated: function(){
            this.initData();
        },
        deactivated: function(){

        },
        mounted: function(){
            // this.initData();
        },
        // watch:{
        //     '$route'(to, from){
        //         if(to.fullPath.indexOf('userList') >= 0){
        //             this.getUsers();
        //         }
        //     }
        // },
        methods: {
            async initData(){
                try{
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                this.currentSize = val;
                this.getUsers();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUsers()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addUser(){
                this.$router.push('userOperation');
            },
            async batchDelete(){
                if(this.multipleSelection.length === 0){
                    this.$notify.error({
                        title: '错误',
                        message: '至少选择一条数据',
                        offset: 100
                    });
                }
                // this.multipleSelection.map(itme => return item.guid);
                let idList = _.map(this.multipleSelection,'id');
                let ids = idList.join(',');
                api.batchDelUser(ids).then(result => {
                    this.getUsers()
                }).catch(oError => {

                })
            },
            async getUsers(){
                //获取表单的值
                const params = {
                    ...this.searchForm,
                    pageSize: this.currentSize,
                    pageNo: this.currentPage
                }
                api.getUserList(params).then(result => {
                    this.tableData = [];
                    this.total = result.data.total;
                    if(result.data.users){
                        result.data.users.forEach(item => {
                            this.tableData.push(item);
                        })
                    }

                }).catch(oError => {
                })

            },
            handleClick(row){
                console.log(row);
                const id = row.id
                // push({ path: `/user/${row.guid}` })
                this.$router.push({ path: `userOperation/edit/${id}` });
            },
            async deleteUser(row){
                api.delUser(row.id).then(result => {
                    this.getUsers();
                }).catch(oError => {

                })
                // const result = await deleteUser(row.guid);
                // if(result.success){
                //     this.getUsers();
                // }else{
                //
                // }
            },
            onSearchSubmit(){
                this.getUsers();
            },
            stillMore(){

            },
            clearData(){
                this.searchForm = {
                    loginName: '',
                    mobile: '',
                    enable: '',
                }
            },
            resetSubmit(){
                this.clearData();
            }
        },
    }
</script>

<style lang="less">
	@import '../../../style/mixin';
    .table_container{
        padding: 10px 20px 20px 20px;
    }
    .button_container{
        padding-left: 20px;
        padding-top: 20px;
    }
</style>
