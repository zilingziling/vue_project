<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';
export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '262px'
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		chartData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			chart: null
		};
	},
	watch: {
		chartData: {
			deep: true,
			handler(val) {
				this.setOptions(val);
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart();
		});
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el, 'macarons');
			this.setOptions(this.chartData);
		},
		setOptions({ yprice, xmonth } = {}) {
			this.chart.setOption({
				// axisPointer
				xAxis: {
					position: 'top',
					data: xmonth,
					boundaryGap: false,
					axisTick: {
						show: false
					},
					//axisLine:坐标轴轴线相关设置
					axisLine: {
						show: false,
						lineStyle: {
							color: '#A0A0A0'
						},
						onZero: false
					},
					//网格线
					splitLine: {
						show: true,
						lineStyle: {
							color: '#EEEEEE'
						}
					}
				},
				grid: {
					left: 10,
					right: 10,
					bottom: 20,
					top: 30,
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					formatter: '本月利润 <br/>￥{c}',
					axisPointer: {
						lineStyle: {
							color: '#FFB018'
						},
						type: 'line'
					},
					text: '123456',
					padding: [15, 20],
					extraCssText:
						'background:#fff;color:#FF5660;font-size:16px;box-shadow:0px 5px 16px 0px rgba(218,218,218,0.5);font-weight:bold;font-family:PingFangSC;text-align:center'
				},
				yAxis: {
					show: false,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#FFB018'
						},
						onZero: false
					},
					//网格线
					splitLine: {
						show: false,
						lineStyle: {
							color: '#EEEEEE'
						}
					}
				},
				series: [
					{
						type: 'effectScatter',
						showEffectOn: 'render',
						rippleEffect: {
							period: 4,
							brushType: 'stroke',
							scale: 1.5
						},
						name: '月利润',
						itemStyle: {
							// color: '#6A5ACD',
							normal: {
                // color: '#FFB018',
                color: {
								type: 'radial',
							  x: 0.5,
                y: 0.5,
                r: 0.5,
								colorStops: [
									{
										offset: .3,
										color: 'rgba(245,166,35,1)' // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: 'rgba(245,166,35,0.3)' // 100% 处的颜色
									},
									{
										offset: 1,
										color: 'rgba(245,166,35,0.1)' // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							},
								lineStyle: {
									// 系列级个性化折线样式
									width: 2,
									type: 'solid',
									color: new echarts.graphic.LinearGradient(0,	0,0,1,
										[
											{
												offset: 0,
												color: '#FAD961'
											},
											{
												offset: 1,
												color: '#F76B1C'
											}
										]
									) //线条渐变色
								}
							}
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: 'rgba(250,217,97,0.3)' // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: 'rgba(250,217,97,0.1)' // 100% 处的颜色
									},
									{
										offset: 1,
										color: 'rgba(250,217,97,0.1)' // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						symbolSize: 16,
						symbol: 'circle',
						smooth: true,
						type: 'line',
						data: yprice,
						animationDuration: 2800,
						animationEasing: 'cubicInOut'
					}
				]
			});
		}
	}
};
</script>
