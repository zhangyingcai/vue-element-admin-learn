<template>
  <div>
    <Header />
    <div class="page-container">
      <el-tabs v-model="activeName" class="mt-1 ml-1 mr-1 white-bg pr-1 pl-1">
        <el-tab-pane label="地址信息" name="txinfo">
          <el-row class="mycard">
            <el-col :span="8">
              <span class="all f12">当前地址: </span>
            </el-col>
            <el-col :span="16">
              <span class="f12 link nomal-cell-text-ellipsis" @click="handleCopy($event)">{{ address }}</span>
            </el-col>
          </el-row>
          <el-row class="bodertop mycard">
            <el-col :span="8">
              <span class="f12">地址名称: </span>
            </el-col>
            <el-col :span="16">
              {{ tag ? tag : '-' }}
            </el-col>
          </el-row>

          <el-row class="pb-1 bodertop mycard">
            <el-col :span="8">
              <span class="f12">持有BCAT: </span>
            </el-col>
            <el-col :span="16">
              {{ total | tokenValue(tokenDecimal) | tokenMoney }}
            </el-col>
          </el-row>
          <el-row v-if="message" class="pb-1 bodertop mycard">
            <el-col :span="8">
              <span class="f12">地址简介:</span>
            </el-col>
            <el-col :span="16">
              {{ message }}
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="流动信息" name="transfers">
          <AccountInfoTable :address="address" :tag="tag" @updateTotal="updateTotal" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AccountInfoTable from './AccountInfoTable'
// import reqwest from 'reqwest'
import config from '@/config/index'
import { tokenValue, tokenMoney } from '../tokenfilters'
import Header from '../components/Header'
import clip from '@/utils/clipboard'
export default {
  components: {
    AccountInfoTable,
    Header
  },
  filters: {
    tokenValue,
    tokenMoney
  },
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'txinfo',
      total: 0,
      contractaddress: config.contractaddress,
      tokenDecimal: config.tokenDecimal,
      tag: '',
      message: ''
    }
  },
  methods: {
    updateTotal(value, tag, message) {
      this.total = value
      this.tag = tag
      this.message = message
    },
    handleCopy(event) {
      clip(this.address, event)
    }
  }
}
</script>
<style scoped>
.mycard {
  padding: 18px 0;
}
.bodertop{border-top: 1px solid #F1F1F1}
</style>
