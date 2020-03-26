<template>
  <div class="app-container">
    <ul>
      <li>
        <router-link to="props/1">布尔传参</router-link>
      </li>
      <li>
        <router-link to="static">对象传参</router-link>
      </li>
      <li @click="passValue">
        <div>对象传参修改参数</div>
      </li>
      <li>
        <router-link to="dynamic/123">函数传参</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: undefined
    }
  },
  methods: {
    passValue() {
      this.$router.push({ path: 'static', query: { name: 'dd' }})
    }
  }
}
</script>
