<template>
  <div>
    admin
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <div>
      <!-- 属性规则 对于多个单词通过连接符并且小写来访问 -->
      <!-- 因为HTML中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符 -->
      <line-chart :chart-data="chartData"></line-chart>
    </div>
    <bar-chart></bar-chart>
    <count-to-user></count-to-user>
    <to-do-list></to-do-list>
    <MyToDoList></MyToDoList>
  </div>
</template>
<script>
import BarChart from './components/BarChart'
import CountToUser from './components/CountToUser';
import PanelGroup from './components/PanelGroup';
import LineChart from './components/LineChart';
import ToDoList from './components/ToDoList/index'
import MyToDoList from './components/MyToDoList/index'
// linedata
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: { BarChart,CountToUser,PanelGroup,LineChart,ToDoList,MyToDoList },
  data() {
    return {
      chartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type){
      this.chartData = lineChartData[type]
    }
  }
}
</script>
