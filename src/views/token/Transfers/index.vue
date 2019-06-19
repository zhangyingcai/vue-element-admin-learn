<template>
  <div>
    <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="hash"
        label="哈希">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis" :to="`/txinfo/${row.hash}`">{{row.hash}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="timeStamp"
        label="时间"
        width="150">
        <template slot-scope="{row}">
          <span>{{ row.timeStamp | formatTime }}</span>
        </template>
        </el-table-column>
      <el-table-column
        prop="from"
        label="发送方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis" :to="`/accountinfo/${row.from}`">{{ row.from}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="to"
        label="接收方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis" :to="`/accountinfo/${row.to}`">{{ row.to}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="value"
        label="数量"
        width="150">
        <template slot-scope="{row}">
          <span>{{ row.value | tokenValue(row.tokenDecimal) | tokenMoney}}</span>
        </template>
        </el-table-column>
    </el-table>
    <Pagination :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad" />
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import Pagination from '@/components/Pagination'
import { tokenValue, tokenMoney } from '../tokenfilters'

export default {
  filters: {
    tokenValue,
    tokenMoney
  },
  components: {
    Pagination
  },
  data () {
    return {
      data: [],
      loading: false,
      busy: false,
      page: 1,
      limit: 10
    }
  },
  beforeMount () {
    this.page = 1
    this.loading = true
    this.getTransactions()
  },
  methods: {
    fetchData (callback) {
      reqwest({
        // url: 'https://explorer-web.api.btc.com/v1/eth/tokentxns/0xfdeaa4ab9fea519afd74df2257a21e5bca0dfd3f?page=1&size=10',
        url:  `${config.tokentxuri}&apikey=${config.apikey}&contractaddress=${config.contractaddress}&sort=${config.sort}&page=${this.page}&offset=${this.limit}`,
        // type: 'json',
        method: 'get',
        contentType: 'text/html',
        crossOrigin: true,
        success: (res) => {
          callback(res)
        },
      })
    },
    getTransactions() { // 获取官方地址数量
      reqwest({
        url:  `${config.transactionsurl}?page=${this.page}&limit=${this.limit}`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then((res)=>{
        this.loading = false
        if (res.status == '1'){
          this.data = res.result
        }
      }).catch((err) => {
        this.loading = false
      })
    },
    handleInfiniteOnLoad  () {
      this.loading = true
      this.getTransactions()
    },
  },
}
</script>
<style>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: calc(100vh - 40px);
  /* max-height: 800px; */
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.cell-text-ellipsis{
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 960px) {
  .cell-text-ellipsis{
    max-width: 100px;
  }
}
</style>