<template>
  <div class="contain">
    <div class="add-order-title">商品信息</div>
    <van-cell-group>
      <van-field v-model="name" required clearable label="商品名称" placeholder="请输入商品名称"/>

      <van-field
        v-model="introduction"
        type="textarea"
        label="商品介绍"
        placeholder="请输入商品介绍"
        maxlength="100"
        rows="1"
        required
        autosize
        :border="false"
      />
    </van-cell-group>
    <div v-if="message" class="add-order__title">{{ message }}</div>
    <div class="add-order-title">商品图片</div>
    <div class="pd-m-1 backwhite">
      <van-uploader :before-read="beforeRead" v-model="fileList" multiple :max-count="6" />
    </div>
    <div class="add-order-title">货币</div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="token" :options="options" />
    </van-dropdown-menu>
    <div class="add-order-title">商品价格</div>
    <van-cell-group>
      <van-field v-model.number="price" maxlength="10" required clearable label="商品价格" placeholder="请输入商品价格" />
    </van-cell-group>
    <div class="add-order-title">是否上架</div>
    <van-cell-group>
      <van-switch-cell v-model="status" title="是否上架" />
    </van-cell-group>
    <div class="text-center mt-1">
      <van-button class="weui-btn" type="primary" :disabled="!this.name || !this.introduction || !this.fileList.length || !this.price || !this.token" @click="submit">确认</van-button>
    </div>
  </div>
</template>
<script>
const tokenlist = [
  {
    asset_id: 'c94ac88f-4671-3976-b60a-09064f1811e8',
    icon_url:
      'https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128',
    id: 1,
    name: 'Mixin',
    symbol: 'XIN'
  }
]
export default {
  name: 'Add',
  data() {
    return {
      name: '',
      message: '',
      introduction: '',
      fileList: [],
      token: '0',
      options: tokenlist,
      price: null,
      status: true
    }
  },
  created() {
    this.optionArray(tokenlist)
  },
  methods: {
    beforeRead(file) {
      if (Array.isArray(file)) {
        return file.every(item => {
          return this.isImage(item)
        })
      } else {
        return this.isImage(file)
      }
    },
    isImage(file) {
      if (!file.type.includes('image')) {
        this.$toast('请上传图片')
        return false
      }
      return true
    },
    optionArray(arr) {
      return arr.map((item, key) => {
        this.$set(item, 'value', key + '')
        this.$set(item, 'text', item.symbol)
      })
    },
    submit() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.add-order {
  &-title {
    padding: 2vw 3vw;
    color: #999;
    font-size: 16rem;
  }
}
</style>
