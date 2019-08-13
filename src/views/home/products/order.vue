<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed/>
    <van-cell-group class="has-nav-bar">
      <van-cell title="金额" :value="order.payment.amount" />
      <van-cell title="支付币种" :value="order.product.currency.symbol" />
      <van-cell title="订单编号" :value="order.number" />
      <van-cell title="订单状态" :value="order.state" />
      <van-cell title="商品" :value="order.product.name" />
      <van-cell title="商品简介" :value="order.product.introduction" />
      <van-cell title="买家" :value="order.buyer.phone" />
      <van-field
        v-model="content"
        type="textarea"
        placeholder="请输入收货地址"
        maxlength="100"
        rows="3"
        autosize
        :border="false"
      />
    </van-cell-group>
    <div class="order-big-bg text-center">
      <van-button class="weui-btn" type="primary" @click="handlePay">立即支付</van-button>
    </div>
  </div>
</template>
<script>
const order = {
  id: '123',
  number: '123123',
  payment:{
    amount: '10',
    asset_id:'',
    memo:'',
    pay_url:'',
    state:'',
    trace_id:''
  },
  amount: '10',
  product: {
    currency: {
      asset_id: "c94ac88f-4671-3976-b60a-09064f1811e8",
      icon_url: "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
      id: 1,
      name: "Mixin",
      symbol: "XIN"
    },
    name: '名称',
    introduction: '我有个一个大苹果我有个一个大苹果我有个一个大苹果我有个一个大苹果我有个一个大苹果我有个一个大苹果'
  },
  buyer:{
    avatar: "",
    mixin_id: "236856",
    mixin_uid: "f182fbc5-5bf7-4bb6-b9b0-597f1c45a943",
    name: "张",
    phone: "+8617625320768"
  },
  state:'未支付'
}
export default {
  name: 'ProductOrder',
  data() {
    return {
      title: this.$route.meta.title,
      order: order,
      content: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    handlePay() {
      // platform 判断有问题 需要根据 navigator.u
      if (navigator.userAgent.indexOf('Windows') > -1) {// 移动端
        alert('移动端')
      } else { // 前端
        location.href = "https://mixin.one/pay?recipient=076ecd36-4c8e-4a12-9aa2-d541bdbba58d&asset=c6d0c728-2624-429b-8e0d-d9d19b6592fa&amount=0.00035&trace=0c242063-79a0-4447-82fb-739362da74ac&memo=从小馋猫₿ora(mixinID: 37321863, 电话: ***2316) 购买 (Bora的朋友圈文章发布原则)"
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.order{
  &-big-bg{
    padding-top: 10vw;
  }
}
</style>
