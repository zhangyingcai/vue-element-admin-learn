<template>
  <div>
    <van-nav-bar :title="typeTitle[type]" left-arrow @click-left="onClickLeft" fixed/>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    class="orders"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, key) in list"
      :key="key"
      class="product-cell"
      @click="toinfo(item)">
      <van-row>
        <van-col span="8">
          <van-image
            width="20vw"
            height="20vw"
            fit="contain"
            :src="item.cover_urls[0]"
          />
        </van-col>
        <van-col span="12">
          <span class="product-name">{{ item.name }}</span>
          <span class="product-introduction">{{ item.introduction }}</span>
        </van-col>
        <van-col span="4">
          <img class="token-icon" :src="item.currency.icon_url" alt="">
        </van-col>
      </van-row>
      <div>
        <div class="product-price">
          <span class="price-number">{{ item.price }}</span>
          <span class="price-token">{{ item.currency.symbol }}</span>
        </div>
      </div>
    </van-cell>
  </van-list>
  </div>
</template>
<script>
// 根据 type 展示不同的内容
const typeTitle = {
  'selling': '正在出售',
  'sell': '卖出订单',
  'buy': '买入订单',
  'selled': '已售商品'
}
import { getProducts } from '@/api/home'
export default {
  name: 'OrderList',
  props: {
    type: {
      type: String,
      default: 'sell'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      typeTitle: typeTitle
    }
  },
  methods: {
    onLoad() {
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      getProducts()
        .then((response) => {
          this.list = Array.prototype.concat(this.list, response.data.items) || []
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.loading = false
        })
    },
    toinfo() {},
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.orders{
  padding-top: 46px;
}
</style>
