<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="button_container">
            <el-form  :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="服务器url">
                            <el-col :span="19">
                                <el-input v-model="searchForm.url" placeholder="请输入url"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="访问者ip">
                            <el-col :span="19">
                                <el-input v-model="searchForm.ip" placeholder="请输入ip"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="服务器方法">
                            <el-col :span="19">
                                <el-input v-model="searchForm.functionName" placeholder="请输入方法"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: center">
                        <el-form-item>
                            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
                            <el-button  @click="resetSubmit">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="状态　　">
                            <el-col :span="19" >
                                <el-select v-model="searchForm.status" clearable placeholder="请选择状态" style="width: 100%">
                                    <el-option
                                        v-for="item in logStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户编码">
                            <el-col :span="19">
                                <el-input v-model="searchForm.customerId" placeholder="请输入客户编码"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="公司编码　">
                            <el-col :span="19" >
                                <el-input v-model="searchForm.companyId" placeholder="请输入公司编码"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="开始时间">
                            <el-col :span="19" >
                                <el-date-picker
                                    style="width: 100%"
                                    v-model="searchForm.startTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结束时间">
                            <el-col :span="19">
                                <el-date-picker
                                    style="width: 100%"
                                    v-model="searchForm.endTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                ref="multipleTable"
                :data="tableData"
                :stripe="true"
                border
                @row-click="rowClick"
                highlight-current-row
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="65">
                </el-table-column>
                <el-table-column
                    label="服务器url"
                    width="260">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.url }}</p>
                            <div slot="reference" class="name-wrapper line-limit-length">
                                {{ scope.row.url }}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    property="ip"
                    label="访问者ip"
                    width="180">
                </el-table-column>
                <el-table-column
                    property="functionName"
                    label="服务器方法">
                </el-table-column>
                <el-table-column
                    property="startTime"
                    width="175"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    property="endTime"
                    width="175"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    property="customerId"
                    width="100"
                    label="客户编码">
                </el-table-column>
                <el-table-column
                    property="companyId"
                    width="100"
                    label="公司编码">
                </el-table-column>
                <el-table-column
                    width="80"
                    label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status == 1 ? '成功':'失败' }}
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
        <el-dialog title="日志详情" :visible.sync="dialogLogDetail">
            <el-row>
                <el-col :span="8">
                    <span>访问者ip:{{logDetail.ip}}</span>
                </el-col>
                <el-col :span="8">
                    <span>状态:{{logDetail.status == '1'? '成功':'失败'}}</span>
                </el-col>
                <el-col :span="8">
                    <span>公司编码:{{logDetail.companyId}}</span>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-col :span="8">
                    <span>开始时间:{{logDetail.startTime}}</span>
                </el-col>
                <el-col :span="8">
                    <span>结束时间:{{logDetail.endTime}}</span>
                </el-col>
                <el-col :span="8">
                    <span>客户编码:{{logDetail.customerId}}</span>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                    <span>服务器url:{{logDetail.url}}</span>
            </el-row>
            <el-row style="margin-top: 20px;">
                    <span>服务器方法:{{logDetail.functionName}}</span>
            </el-row>
            <el-row style="margin-top: 20px;">
                    <span>请求数据:
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="logDetail.reqJson" ></el-input></span>
            </el-row>
            <el-row style="margin-top: 20px;">
                    <span>响应数据:<el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="logDetail.resJson" ></el-input></span>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import api from '@/api/getData';
    import {logStatus} from '@/api/contants';
    export default {
        name: 'log-list',
        data(){
            return {
                tableData: [],
                currentRow: null,
                currentPage: 1,
                currentSize: 20,
                multipleSelection: [],
                searchForm: {
                    ip: '',
                    companyId: '',
                    status: '',
                    customerId: '',
                    url: '',
                    functionName: '',
                    startTime: '',
                    endTime: '',
                },
                logStatus,
                total:0,
                dialogLogDetail: false,
                logDetail:{},
                labelPosition: 'right'
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
        methods: {
            async initData(){
                try{
                    this.getLogs();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                this.currentSize = val;
                this.getLogs();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getLogs()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async getLogs(){
                //获取表单的值
                if(this.searchForm.startTime != ''){
                    this.searchForm.startTime = this.$getTime(this.searchForm.startTime);
                }
                if(this.searchForm.endTime != ''){
                    this.searchForm.endTime = this.$getTime(this.searchForm.endTime);
                }
                const params = {
                    ...this.searchForm,
                    pageSize: this.currentSize,
                    pageNo: this.currentPage
                }
                api.getLogList(params).then(result => {
                    this.tableData = [];
                    if(result.success){
                        this.total = result.total;
                        if(result.logs){
                            result.logs.forEach(item => {
                                this.tableData.push(item);
                            })
                        }
                    }else{
                        const tableData = {};
                    }
                })
            },
            rowClick(val){
                console.log(val);
                this.dialogLogDetail = true;
                this.logDetail = val;
            },
            onSearchSubmit(){
                this.getLogs();
            },
            clearData(){
                this.searchForm = {
                    ip: '',
                    companyId: '',
                    status: '',
                    customerId: '',
                    url: '',
                    functionName: '',
                    startTime: '',
                    endTime: '',
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
    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
    }
</style>
