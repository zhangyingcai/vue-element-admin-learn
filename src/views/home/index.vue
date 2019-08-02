<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="contain"
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
</template>
<script>
import { getProducts } from '@/api/home'
import { getList } from '@/api/table'
import { truncate } from 'fs';
export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      finished: false,
      list: []
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
      });
    },
    toinfo(item) {
      this.$router.push({name: 'Products', params:{id: item.id}})
    }
  }
}
</script>
<style lang="scss" scoped>
.product-cell{
  padding: 4vw;
  border-bottom: 1px solid #f4f4f4;
}
.product-img{
  display: block;
  width: 20vw;
  height: 20vw;
  margin: 0 auto;
}
.product-name{
  display: block;
  font-size: 16rem;
  font-weight: 500;
  color: #333;
}
.product-introduction{
  font-size: 12rem;
  color: #999;
}
.product-price{
  float: right;
  &>.price-number{
    color: red;
    font-size: 16rem;
    font-weight: 400;
    max-width: 50vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &>.price-token{
    font-style: italic;
    color: #999;
  }
}
.token-icon{
  widows: 5vw;
  height: 5vw;
  float: right;
}
</style>
