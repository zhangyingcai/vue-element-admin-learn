<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" fixed/>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="fr">
          <span>{{ goods.currency.symbol }}</span>
          <img class="goods-small-img" :src="goods.currency.icon_url" alt="">
        </div>
        <div class="goods-price">{{ goods.price }} <span>{{ goods.currency.symbol }}</span></div>
      </van-cell>
      <van-cell class="goods-express">
        <p class="goods-text">{{ goods.introduction }}</p>
      </van-cell>
    </van-cell-group>
    
    <div class="text-center mt-1">
      <van-button class="weui-btn" type="primary" @click="submitBuy" :disabled="user_id === goods.seller.user_id">{{ buyTitle }}</van-button>
    </div>

    <div class="goods-header mt-1">讨论区</div>
    <van-cell v-show="!comments.length">
      <span>暂时没有评论</span>
    </van-cell>
    <van-cell @click="hanleDelete">
      <van-cell v-for="(item, key) in comments" :key="key" :data-id="item.id" name="comment" class="goods-express">
        {{ item.full_name }} : {{ item.content }}
      </van-cell>
    </van-cell>
    <van-field
        v-model="comment.content"
        type="textarea"
        placeholder="说两句..."
        maxlength="100"
        rows="3"
        autosize
        :border="false"
      />
    <div class="text-center mt-1">
      <van-button class="weui-btn" @click="submitComment">{{ commentTitle }}</van-button>
    </div>
  </div>
</template>
<script>
// 登录状态判断 是 -》请先登录 -》否 判断是否是同一人 -》 是 不能购买 否 能够购买
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'Products',
  props: {
    id: String
  },
  data() {
    return {
      goods: {
        id: 1,
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
        },
        seller: {
          user_id: undefined,
          full_name: '张'
        }
      },
      comments: [
        {
          id: 1,
          content: '大苹果',
          full_name: '张三'
        },
        {
          id: 2,
          content: '你是我的小苹果啊，你是我的小苹果啊，你是我的小苹果啊，',
          full_name: '李四'
        }
      ],
      comment: {
        content: '',
        productid: 1
      }
    }
  },
  computed: {
    ...mapGetters(['user_id','token']),
    buyTitle: function() {
      if (!this.token) return '请登录后购买'
      return this.user_id === this.goods.seller.user_id ? '不能购买自己的商品' : '立即购买' 
    },
    commentTitle: function() {
      if (!this.token) return '请登录后评论'
      return '发表评论'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    submitComment() {
      if (!this.token) {
        this.$router.push(`/login?redirect=${this.$route.path}`)
      } else {
        // 评论
      }
    },
    submitBuy() {
      if (!this.token) {
        this.$router.push(`/login?redirect=${this.$route.path}`)
      } else {
        // buy
      }
    },
    hanleDelete(e) {
      console.log(e)
      if (e.target.name === 'comment') {
        const id = e.target.dataset.id;
        console.log(id)
      }
    }
  }
}
</script>

<style lang="scss">
.goods {
  padding-top: 46px;
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
  &-small-img {
    display: inline-block;
    width: 20px;
    vertical-align: middle;
  }
}
</style>