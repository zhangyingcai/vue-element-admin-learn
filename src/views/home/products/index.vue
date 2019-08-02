<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft"/>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ goods.price }} <span>{{ goods.currency.symbol }}</span></div>
      </van-cell>
      <van-cell class="goods-express">
        <p class="goods-text">{{ goods.introduction }}</p>
      </van-cell>
    </van-cell-group>
    
    <div class="text-center mt-1">
      <van-button class="weui-btn" type="primary" @click="submitBuy">立即购买</van-button>
    </div>

    <div class="goods-header mt-1">讨论区</div>
    <van-cell class="goods-express">
      <p class="goods-text">{{ goods.introduction }}</p>
    </van-cell>
    <van-field
        v-model="comment"
        type="textarea"
        placeholder="说两句..."
        maxlength="100"
        rows="3"
        autosize
        :border="false"
      />
    <div class="text-center mt-1">
      <van-button class="weui-btn" @click="submitComment">发表评论</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Products',
  props: {
    id: String
  },
  data() {
    return {
      goods: {
        name: '美国伽力果',
        price: 2680,
        introduction: '大大大苹果红苹果高大大大苹果红苹果高大大大苹果红苹果高大大大苹果红苹果高大大大苹果红苹果高大大大苹果红苹果高',
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ],
        currency: {
          asset_id: 'c94ac88f-4671-3976-b60a-09064f1811e8',
          icon_url: 'https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128',
          id: 1,
          name: 'Mixin',
          symbol: 'XIN'
        }
      },
      comment: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    submitComment() {

    },
    submitBuy() {

    }
  }
}
</script>

<style lang="scss">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
  &-text {
    text-indent: 4vw;
  }
  &-header {
    padding: 2vw 3vw;
    color: #999;
    font-size: 16rem;
  }
}
</style>