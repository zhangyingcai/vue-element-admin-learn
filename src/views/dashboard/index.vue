<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <component :is="componentId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardAdmin from './admin/index'
import DashboardEditor from './editor'

export default {
  name: 'Dashboard',
  components: { DashboardAdmin, DashboardEditor },
  data() {
    return {
      componentId: 'DashboardAdmin'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
