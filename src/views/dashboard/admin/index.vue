<template>
  <div>
    admin
    <bar-chart></bar-chart>
    <count-to-user></count-to-user>
  </div>
</template>
<script>
import BarChart from './components/BarChart'
import CountToUser from './components/CountToUser';
export default {
  name: 'DashboardAdmin',
  components: { BarChart,CountToUser }
}
</script>
