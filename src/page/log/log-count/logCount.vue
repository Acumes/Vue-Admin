<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="button_container">
            <el-form  :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="服务器方法">
                            <el-col :span="18">
                                <el-input v-model="searchForm.functionName" placeholder="请输入方法"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户编码">
                            <el-col :span="19">
                                <el-select  style="width: 100%" v-model="searchForm.customerId" @change="changeCustomer" filterable clearable placeholder="请选择客户编码">
                                    <el-option
                                        v-for="item in customers"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled"
                                    >
                                    </el-option>
                                </el-select>
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
                    <el-col :span="6" style="text-align: center">
                        <el-form-item>
                            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
                            <el-button  @click="resetSubmit">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="月份/天   　">
                            <el-col :span="18">
                                <el-select  style="width: 100%" v-model="dateType" @change="changeCustomer" filterable clearable placeholder="请选择日期">
                                    <el-option
                                        v-for="item in dateTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled"
                                    >
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <div v-if="dateType == 'day'">
                        <el-col :span="6">
                            <el-form-item label="日期　　">
                                <el-col :span="19">
                                    <el-date-picker
                                        v-model="date"
                                        align="right"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions1"
                                        style="width: 100%">
                                    </el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div v-if="dateType == 'month'">
                        <el-col :span="6">
                            <el-form-item label="日期　　">
                                <el-col :span="19">
                                    <el-date-picker
                                        v-model="date"
                                        type="month"
                                        placeholder="选择月"
                                    style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6" style="text-align: center">
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
                    label="序号"
                    width="65">
                </el-table-column>
                <el-table-column
                    property="count"
                    label="总次数"
                    width="90">
                </el-table-column>
                <el-table-column
                    property="success"
                    label="成功次数"
                    width="120">
                </el-table-column>
                <el-table-column
                    property="fault"
                    label="失败次数"
                    width="120">
                </el-table-column>
                <el-table-column
                    property="functionName"
                    label="服务器方法">
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
        <el-dialog :title="functionName" width="100%" :visible.sync="dialogLogDetail" center>
            <el-row>
                <el-col :span="4">
                    <el-select  v-model="type" @change="getDate">
                        <el-option
                            v-for="item in times"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        >
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <tendency :sevenData='sevenData' :sevenDay='sevenDay' :title='title' :customerId="searchForm.customerId"></tendency>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import api from '@/api/getData';
    import {times, dateTypes} from '@/api/contants';
    import {logStatus} from '@/api/contants';
    import tendency from '@/components/tendency';
    import  _ from 'lodash';
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
                    companyId: '',
                    customerId: '',
                    functionName: '',
                },
                dateType:'',
                date:'',
                logStatus,
                total:0,
                dialogLogDetail: false,
                logDetail:{},
                labelPosition: 'right',
                title:'近七日走势图',
                sevenDay: [],
                sevenData: [],
                type:'',
                times,
                customers:[],
                dateTypes,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        components: {
            headTop,
            tendency
        },
        activated: function(){
            //获取路由传过来的customId,data,dateType
            let query = this.$route.query;
            this.date = query.date;
            this.dateType = query.dataType;
            this.searchForm.customerId = query.customerId
            this.initData();
        },
        deactivated: function(){

        },
        methods: {
            async initData(){
                try{

                    this.getLogsCount();
                    this.getCustomers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                this.currentSize = val;
                this.getLogsCount();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getLogsCount()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getLogsCount(){
                //获取表单的值
                const params = {
                    ...this.searchForm,
                    pageSize: this.currentSize,
                    pageNo: this.currentPage,
                    date:this.date,
                    dateType:this.dateType
                }
                api.getLogListGroupByFunction(params).then(result => {
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
                if(_.isObject(this.date)){
                    if(this.dateType == 'day'){
                        this.date = this.$getTime(this.date,'yyyy-MM-dd');
                    }else{
                        this.date = this.$getTime(this.date,'yyyy-MM');
                    }
                }
                this.dialogLogDetail = true;
                this.functionName = val.functionName;
                this.type = 'week';
                let times = this.$getMonths(null,6);
                this.sevenDay = times;
                this.getLogStatustucs();
            },
            onSearchSubmit(){
                if(this.dateType == 'month'){
                    this.date = this.$getTime(this.date,'yyyy-MM');
                }
                if(this.dateType == 'day'){
                    this.date = this.$getTime(this.date,'yyyy-MM-dd');
                }
                this.getLogsCount();
            },
            clearData(){
                this.searchForm = {
                    companyId: '',
                    customerId: '',
                    functionName: '',
                }
            },
            resetSubmit(){
                this.clearData();
            },
            getLogStatustucs (){
                api.getLogStatustucs({type:this.type,times:this.sevenDay,customerId:this.searchForm.customerId,functionName:this.functionName}).then(response => {
                    if(response.success){
                        let data = [];
                        data.push(response.faultList)
                        data.push(response.successList)
                        this.sevenData = data;
                    }
                }).catch(oError => {

                })
            },
            getDate(data){
                let times;
                if(data == 'week'){
                    this.title = '最近七天走势图';
                    times = this.$getMonths(null,6);
                }else if(data == 'month'){
                    this.title = '最近三十天走势图';
                    times = this.$getMonths(null,29);
                }else if(data == 'year'){
                    this.title = '最近一年走势图';
                    times = this.$getMonths(this.type);
                }
                this.sevenDay = times;
                this.getLogStatustucs();
            },
            getCustomers(){
                api.getCustomers().then(resoponse => {
                    if(resoponse.success){
                        let customerList = [];
                        resoponse.customers.forEach(item => {
                            customerList.push({
                                value:item,
                                label:item
                            })
                        })
                        this.customers = customerList;
                    }
                }).catch(oError => {

                })
            },
            changeCustomer(data){
                this.getLogStatustucs();
            },
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
