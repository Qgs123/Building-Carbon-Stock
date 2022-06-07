$(function () {
    $("#visualization").click(function () {
        generateVisualization();
    });
});

//Ajax请求可视化数据
function generateVisualization() {
    $.ajax({
        type: "GET",
        url: APP_PATH + "/heat-consumption/getHeatConsumption",
        dataType: "json",
        success: function (data) {
            generateChart1(data); //生成供热供冷转换能耗图表
            generateChart2(data); //生成供热供冷转换碳排放图表
        }
    });
}

//生成供热供冷转换能耗图表
function generateChart1(data) {
    var myChart = echarts.init(document.getElementById("display-chart1"));
    myChart.setOption({
        tooltip: { //提示框组件
            trigger: 'axis' //触发类型,坐标轴触发
        },
        grid: { //grid组件
            left: '5%',
            right: '15%',
            bottom: '10%'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        toolbox: { //工具栏
            right: 10,
            feature: {
                magicType: { //动态类型切换
                    type: ['line', 'bar']
                }
            }
        },
        dataZoom: [ //区域缩放
            {startValue: '2022-05-08'},
            {type: 'inside'} //内置型数据区域缩放组件
        ],
        visualMap: {  //分段型视觉映射组件
            top: 50,
            right: 10,
            precision: 1,  //设置小数精度
            pieces: [{ //定义每块范围
                gt: 0,
                lte: 0.5,
                color: '#FBDB0F'
            }, {
                gt: 0.5,
                lte: 1,
                color: '#FC7D02'
            }, {
                gt: 1,
                lte: 1.5,
                color: '#FD0100'
            }, {
                gt: 1.5,
                lte: 2,
                color: '#AA069F'
            }, {
                gt: 2,
                color: '#AC3B2A'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: 'wHeat',
            type: 'line',
            data: [],
            markLine: { //图表标线
                silent: true, //默认为 false，即响应和触发鼠标事件
                lineStyle: { //标线样式
                    color: '#333'
                },
                data: [
                    {yAxis: 0.5},
                    {yAxis: 1},
                    {yAxis: 1.5},
                    {yAxis: 2}
                ]
            }
        }
    });

    var nameY = [];
    var series = [];
    $.each(data.extend.pageInfo.list, function (index, obj) {
        nameY.push(parseCreatedTime(obj.createdTime));    //挨个取出类别并填入类别数组
        series.push(getThreeBit(obj.wheat));

    });

    myChart.hideLoading();    //隐藏加载动画
    myChart.setOption({        //加载数据图表
        xAxis: {
            data: nameY
        },
        series: [{
            data: series
        }]
    });
}

//生成供热供冷转换碳排放图表
function generateChart2(data) {
    var myChart = echarts.init(document.getElementById("display-chart2"));
    // 显示标题，图例和空的坐标轴
    myChart.setOption({
        tooltip: { //提示框组件
            trigger: 'axis' //触发类型,坐标轴触发
        },
        grid: { //grid组件
            left: '5%',
            right: '15%',
            bottom: '10%'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        toolbox: { //工具栏
            right: 10,
            feature: {
                magicType: { //动态类型切换
                    type: ['line', 'bar']
                }
            }
        },
        dataZoom: [ //区域缩放
            {startValue: '2022-05-08'},
            {type: 'inside'} //内置型数据区域缩放组件
        ],
        visualMap: { //分段型视觉映射组件
            top: 50,
            right: 10,
            precision: 1,
            pieces: [{ //定义每块范围
                gt: 0,
                lte: 0.5,
                color: '#FBDB0F'
            }, {
                gt: 0.5,
                lte: 1,
                color: '#FC7D02'
            }, {
                gt: 1,
                lte: 1.5,
                color: '#FD0100'
            }, {
                gt: 1.5,
                lte: 2,
                color: '#AA069F'
            }, {
                gt: 2,
                color: '#b035d3'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: 'tHeat',
            type: 'line',
            data: [],
            markLine: { //图表标线
                silent: true, //默认为false，即响应和触发鼠标事件
                lineStyle: { //标线的样式
                    color: '#333'
                },
                data: [
                    {yAxis: 0.5},
                    {yAxis: 1},
                    {yAxis: 1.5},
                    {yAxis: 2},
                    {yAxis: 2.5}
                ]
            }
        }
    });

    var nameY = [];
    var series = [];
    $.each(data.extend.pageInfo.list, function (index, obj) {
        nameY.push(parseCreatedTime(obj.createdTime));    //挨个取出类别并填入类别数组
        series.push(getThreeBit(obj.theat));
    });

    myChart.hideLoading();    //隐藏加载动画
    myChart.setOption({        //加载数据图表
        xAxis: {
            data: nameY
        },
        series: [{
            data: series
        }]
    });
}