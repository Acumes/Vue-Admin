<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import Router from 'vue-router';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){

            this.initData();
        },
        data(){
            return {
                Router
            }
        },
        props: ['sevenData', 'sevenDay','title','customerId'],
        methods: {
            initData(){
                if(this.myChart){
                    echarts.dispose(document.getElementById('line1'))
                }
                this.myChart = echarts.init(document.getElementById('line1'));
                const option = {
                    title: {
                        text: this.title
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['失败','成功']
                    },
                    color:['#C1232B','#03fd22'],
                    toolbox: {
                        feature: {
                            magicType: {type: ['bar', 'line']},
                            saveAsImage: {},
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.sevenDay,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'失败',
                            type:'line',
                            // stack: '总量',
                            data:this.sevenData[0],
                        },
                        {
                            name:'成功',
                            type:'line',
                            // stack: '总量',
                            data:this.sevenData[1],
                        }
                    ]
                };
                this.myChart.clear();
                this.myChart.setOption(option);
                const router_ = this.$router;
                const customerId = this.customerId
                this.myChart.on('click',function(data){
                    console.log(data);
                    let dataType = data.name.length < 8 ? 'month':'day';
                    let date = data.name;
                    router_.push({
                        path: 'logCount',
                        name: 'logCount',
                        query: {
                            dataType: dataType,
                            date: date,
                            customerId:customerId
                        }
                    })
                })
            }
        },
        watch: {
            sevenData: function (){
                this.initData()
            },
            sevenDay: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
