<template>
<!-- 可以配置class 和内联属性 -->
  <div v-bind:class="className" v-bind:style="{width:width, height:height}"></div>
</template>
<script>
// 怎么样在 vue 当中使用插件 以及 $nextTick 的使用
// $nextTick 在下次 Dom 更新循环结束之后执行延时回调。在数据更新之后立即使用这个方法，获取更新后的 DOM
// 使用插件时要记得销毁插件实例
import echarts from 'echarts'
export default {
  name: 'bar-chart',
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
      default: '100%'
    },
    animationDuration: {
      type: Number,
      default: 6000
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() { // 组件销毁之前，可以在这里 移除时间、定时器、插件实例等
    // 如果实例已经是 null
    if(!this.chart){
      return
    }
    this.chart.dispose() // echarts 实例销毁事件
    this.chart = null
  },
  methods:{
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration:this.animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration:this.animationDuration
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration:this.animationDuration
        }]
      })
    }
  }
}
</script>