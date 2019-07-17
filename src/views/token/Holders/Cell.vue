<template>
  <div>
    <div v-if="celltype === 'Holders'" class="list-group-item lh-1" @click="handleHolderInfo">
      <el-row>
        <el-col :span="16">
          <div>
            <span>当前地址：</span>
            <router-link class="link cell-text-ellipsis" :class="{ 'max-width': !celldata.tag }" :to="`/accountinfo/${celldata.address}`">
              <span v-if="!celldata.tag">{{ celldata.address }}</span>
              <span v-if="celldata.tag">{{ celldata.tag }}</span>
            </router-link>
          </div>
          <div>
            <span>数量： {{ celldata.value | tokenValue(celldata.tokenDecimal) | tokenMoney }}</span>
          </div>
          <div>
            <span>流动量百分比：{{ celldata.address === appeth ? '不计入流通量' : celldata.percentage }}</span><span v-if="celldata.address !== appeth">%</span>
          </div>
        </el-col>
        <el-col :span="8" class="text-center" style="height:64px;line-height:64px">
          <svg-icon v-if="(index+1+(page-1?page-1:0)*limit) === 1" class="f20" icon-class="first"></svg-icon>
          <svg-icon v-if="(index+1+(page-1?page-1:0)*limit) === 2" class="f20" icon-class="second"></svg-icon>
          <svg-icon v-if="(index+1+(page-1?page-1:0)*limit) === 3" class="f20" icon-class="third"></svg-icon>
          <span v-if="(index+1+(page-1?page-1:0)*limit) > 3">{{ index+1+(page-1?page-1:0)*limit }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-if="celltype === 'Transfers'" class="list-group-item lh-1">
      <el-row>
        <el-col :span="16">
          <div>
            <span>哈希：</span>
            <router-link class="link cell-text-ellipsis max-width" :to="`/txinfo?hash=${celldata.hash}`">{{ celldata.hash }}</router-link>
          </div>
          <div>
            <span>数量： {{ celldata.value | tokenValue(celldata.tokenDecimal) | tokenMoney }}</span>
          </div>
          <div>
            <span>发送方：</span>
            <router-link class="link cell-text-ellipsis" :class="{'max-width': !celldata.fromtag }" :to="`/accountinfo/${celldata.from}`">{{ celldata.fromtag ? celldata.fromtag : celldata.from }}</router-link>
          </div>
          <div>
            <span>接收方：</span>
            <router-link class="link cell-text-ellipsis" :class="{'max-width': !celldata.totag }" :to="`/accountinfo/${celldata.to}`">{{ celldata.totag ? celldata.totag : celldata.to }}</router-link>
          </div>
        </el-col>
        <el-col :span="8" class="text-center traninfo">
          <span class="home-text">{{ celldata.timeStamp | formatTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          <el-tag v-if="address" :class="{ethin: address === celldata.to, ethout: address === celldata.from}" class="inout">{{ address === celldata.from ? '出' : '入' }}</el-tag>
        </el-col>
      </el-row>
    </div>
    <div v-if="celltype === 'Destroy'" class="list-group-item lh-1" @click="handleDestroyInfo">
      <el-row>
        <el-col :span="16">
          <div>
            <span>销毁数量： <strong>- {{ celldata.value | tokenMoney }} BCAT</strong></span>
          </div>
          <div>
            <span>哈希：</span>
            <router-link class="link cell-text-ellipsis max-width" :to="`/txinfo?id=${celldata.id}`">{{ celldata.hash }}</router-link>
          </div>
        </el-col>
        <el-col :span="8" class="text-center">
          <span class="home-text">{{ celldata.timeStamp | formatTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { tokenValue, tokenMoney } from '../tokenfilters'
import config from '@/config/index'
export default {
  name: 'HoldersCell',
  filters: {
    tokenValue,
    tokenMoney
  },
  props: {
    celldata: {
      type: Object,
      default() {
        return {
          address: '',
          percentage: '',
          tokenDecimal: 0,
          value: '',
          tab: ''
        }
      }
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    index: {
      type: Number,
      default: 0
    },
    celltype: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      appeth: config.appeth
    }
  },
  methods: {
    handleHolderInfo() {
      this.$router.push(`/accountinfo/${this.celldata.address}`)
    },
    handleDestroyInfo() {
      this.$router.push(`/txinfo?id=${this.celldata.id}`)
    }
  }
}
</script>
<style scoped>
.traninfo{height:89px;display: flex;flex-direction: column;justify-content: space-between;align-items: center;}
.ethin{
  background-color: #69C265;
  color: #fff;
  border: 0;
}
.ethout{
  background-color: #E0AE5C;
  color: #fff;
  border: 0;
}
.inout{width: 50px;}
</style>

