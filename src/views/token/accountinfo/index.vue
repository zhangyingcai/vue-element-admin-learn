<template>
  <div>
    <Header/>
    <div class="page-container">
      <el-tabs v-model="activeName" class="mytabs">
        <el-tab-pane label="地址信息" name="txinfo">
          <el-card class="mycard mb-1" shadow="never">
            <div slot="header">
              <span class="all">持有BCAT</span>
              <br>
              <div class="all pt-1">{{total | tokenValue(tokenDecimal) | tokenMoney}}</div>
            </div>
            <div class="pb-1">
              <span class="">当前地址</span>
              <br>
              <div class="address cell-text-ellipsis">
                <span class="link">{{address}}</span>
              </div>
            </div>
            <div class="pb-1">
              <span class="">地址信息</span>
              <br>
              <div class="address">
                <span class="black" v-if="tag">{{ tag }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="流动信息" name="transfers">
          <AccountInfoTable :address="address" :tag="tag" @updateTotal="updateTotal"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AccountInfoTable from './AccountInfoTable'
import reqwest from 'reqwest'
import config from '@/config/index'
import { tokenValue, tokenMoney } from '../tokenfilters'
import Header from '../components/Header'
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
      tag: ''
    }
  },
  methods: {
    updateTotal(value, tag) {
      this.total = value
      this.tag = tag
    }
  }
}
</script>
<style scoped>
.mycard {
  border: 0;
}
</style>
