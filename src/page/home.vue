<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{logCount.intradaySuccess}}</span> 次调用成功</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{logCount.intradayFault}}</span> 次调用失败</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{logCount.successCount}}</span> 次调用成功</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{logCount.faultCount}}</span> 次调用失败</div></el-col>
            </el-row>
		</section>
        <section class="data_section">
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
                <!--<el-col :span="4">-->
                    <!--<el-select  v-model="customerId" @change="changeCustomer" filterable clearable placeholder="请选择客户编码">-->
                        <!--<el-option-->
                            <!--v-for="item in customers"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value"-->
                            <!--:disabled="item.disabled"-->
                        <!--&gt;-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-col>-->
            </el-row>
        </section>
		<tendency :sevenData='sevenData' :sevenDay='sevenDay' :title='title' :customerId="customerId"></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop';
	import tendency from '../components/tendency';
    import api from '@/api/getData';
    import {times} from '@/api/contants';
    // import {getMonths} from '@utils/time';

    export default {
    	data(){
    		return {
    		    logCount:{
                    intradaySuccess:20,
                    intradayFault:30,
                    successCount:1200,
                    faultCount:10
                },
    			sevenDay: [],
    			sevenData: [],
                type:'week',
                title:'近七日走势图',
                times,
                customerId: '',
                customers:[]
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		this.initData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
                let day = this.$getMonths(null,6);
                this.sevenDay = day;
                // this.getLogCount();
                // this.getLogStatustucs();
                // this.getCustomers();
    		},
            getLogCount(){
                api.getLogCount().then(response => {
                    if(response.success){
                        this.logCount = response;
                    }
                }).catch(oError => {

                })
            },
            getLogStatustucs (){
                api.getLogStatustucs({type:this.type,times:this.sevenDay,customerId:this.customerId}).then(response => {
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
                // this.getLogStatustucs();
            },
            changeCustomer(data){
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
            }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
