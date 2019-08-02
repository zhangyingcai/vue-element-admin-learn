<template>
  <div id="app">
    <router-view />
    <van-tabbar v-if="showTabbar" v-model="active" active-color="#07c160" inactive-color="#000" class="tab-backcolor" routed fixed>
      <van-tabbar-item name="home" icon="wap-home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="add" icon="add-o" to="/add">发布</van-tabbar-item>
      <van-tabbar-item name="mine" icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'App',
  // comments: {
  //   [Tabbar.name]:Tabbar,
  //   [TabbarItem.name]:TabbarItem
  // },
  data() {
    return {
      active: 'home',
      whitelist: ['/', 'Home', 'Add', 'Mine', 'Login']
    }
  },
  computed: {
    showTabbar(){
      return this.whitelist.indexOf(this.$route.name) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-backcolor{
  background-color: #f7f7fa;
}
</style>

