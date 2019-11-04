<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '280px'
    },
    height: {
      type: String,
      default: '190px'
    },
    color:{
      type:Array,
      default:()=>["#467AF2","#24CCB8",]
    },
    name:{
      type:String,
      default:'加载中'
    },
    pieData:{
      type:Array,
      default:() => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    pieData: {
      handler(pieData){
        this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: this.color,
        series: [
          {
            name: this.name,
            type: 'pie',
            // roseType: 'radius',
            radius: [0, 70],
            center: ['50%', '50%'],
            label: {
                formatter: "{d}%"
              },
            data: pieData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: this.color,
        series: [
          {
            name: this.name,
            type: 'pie',
            // roseType: 'radius',
            radius: [0, 70],
            center: ['50%', '50%'],
            label: {
                formatter: "{d}%"
              },
            data: [
              { value: 40, name: '加载中...' },
              { value: 60, name: '加载中...' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
