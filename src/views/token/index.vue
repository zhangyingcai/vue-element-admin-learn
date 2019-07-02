<template>
  <div>
    <Header/>
    <div class="page-container">
      <el-card class="text-left mycard">
        <div slot="header">
          <span class="all">理论总量</span>
          <br>
          <div class="all pt-1">{{total | tokenMoney}}</div>
        </div>
        <div class="pb-1">
          <span class="font-weght">实际流通量</span>
          <br>
          <div class="pt-1">{{total-apptotal | tokenMoney}}</div>
        </div>
        <div class="pb-1">
          <span class="font-weght">已通缩销毁量</span>
          <br>
          <div class="pt-1">{{clearTotal | tokenMoney}}</div>
        </div>
        <span class="font-weght">合约地址</span>
        <br>
        <el-col class="address cell-text-ellipsis">
          <span class="link">{{address}}</span>
        </el-col>
      </el-card>
      <el-tabs v-model="activeName" class="mytabs">
        <el-tab-pane label="排行榜" name="holders">
          <Holders/>
        </el-tab-pane>
        <el-tab-pane label="流动信息" name="transfers">
          <Transfers/>
        </el-tab-pane>
        <el-tab-pane label="常用地址" name="address">
          <Address/>
        </el-tab-pane>
        <el-tab-pane label="销毁记录" name="destroy">
          <Destroy/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <CommonFooter></CommonFooter> -->
  </div>
</template>
<script>
import Transfers from './Transfers/index'
import Holders from './Holders/index'
import Address from './Address/index'
import reqwest from 'reqwest'
import config from '@/config/index'
import Destroy from './Destroy/index'
import Header from './components/Header'
// import CommonFooter from './CommonFooter'
import { tokenValue, tokenMoney } from './tokenfilters'
export default {
  name: 'token',
  filters: {
    tokenValue,
    tokenMoney
  },
  components: {
    Transfers,
    Holders,
    Address,
    Destroy,
    Header
  },
  data() {
    return {
      activeName: 'holders',
      total: 439165535, // 合约地址总量
      address: config.contractaddress,
      apptotal: 265562045, // 官方地址总量
      page: 1,
      limit: 1,
      tokenDecimal: config.tokenDecimal
    }
  },
  beforeMount() {
    this.getTokenSupply()
    this.getAppSupply()
  },
  computed: {
    clearTotal: function(){
      return 1000000000 - this.total
    }
  },
  methods: {
    getTokenSupply() { // 获取token 供给量
      reqwest({
        url: config.apiurl+'/tokensupply',
        type: 'json',
        method: 'get',
        crossOrigin: true,
        success: res => {
          if (res.status == '1') {
            this.total = tokenValue(res.result,this.tokenDecimal)
          }
        }
      })
    },
    getAppSupply() { // 获取官方地址数量
      reqwest({
        url:  `${config.apiurl}/accountinfo?address=${config.appeth}&page=${this.page}&offset=${this.limit}`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then((res)=>{
        if (res.status == '1'){
          this.apptotal = tokenValue(res.balance,this.tokenDecimal)
        }
      }).catch((err) => {
        this.loading = false
      })
    }
  }
}
</script>
<style>
.el-tabs__nav-next, .el-tabs__nav-prev{
  color: #37acf6;
}
</style>
