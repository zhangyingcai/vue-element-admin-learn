<template>
  <div>
    <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="hash"
        label="哈希">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis max-width" :to="`/txinfo/${row.hash}`">{{row.hash}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="timeStamp"
        label="时间"
        width="200">
        <template slot-scope="{row}">
          <span>{{ row.timeStamp | formatTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
        </el-table-column>
      <el-table-column
        prop="from"
        label="发送方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis max-width" :to="`/accountinfo/${row.from}`">{{ row.from}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="to"
        label="接收方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis max-width" :to="`/accountinfo/${row.to}`">{{ row.to}}</router-link>
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
    <Pagination :layout="layout" :total="total" :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad" />
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
      limit: 30,
      layout: 'total, prev, next, jumper',
      total: 0
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
          this.total = res.total
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