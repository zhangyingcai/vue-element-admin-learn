<template>
  <div>
    <section class="user-info">
      <img class="user-atatar" :src="user.avatar" alt="">
      <div class="clearblack f16">名字{{ user.name }}</div>
    </section>
    <van-cell class="mt-1" title="卖出订单" is-link to="index" value="0" />
    <van-cell title="买入订单" is-link to="index" value="0" />
    <van-cell title="正在出售" is-link to="index" value="0" />
    <van-cell title="已售商品" is-link to="index" value="0" />

    <van-cell class="mt-1" title="退出登录" @click="signout" is-link/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    signout() {}
  }
}
</script>
<style lang="scss" scoped>
.user-atatar{
  width: 13vw;
  height: 13vw;
  margin: 0 auto;
  border-radius: 50%;
}
.user-info{
  padding: 10vw 0;
  text-align: center;
  background-color: white;
}
</style>
