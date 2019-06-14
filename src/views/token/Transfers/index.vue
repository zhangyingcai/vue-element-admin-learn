<template>
  <div>
    <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="hash"
        label="交易hash">
        <template slot-scope="{row}">
          <a :href="`https://etherscan.io/tx/${row.hash}`" class="link cell-text-ellipsis">{{ row.hash }}</a>
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
          <a :href="`https://etherscan.io/token/${ row.from }`" class="link cell-text-ellipsis">{{ row.from}}</a>
        </template>
        </el-table-column>
      <el-table-column
        prop="to"
        label="接收方">
        <template slot-scope="{row}">
          <a :href="`https://etherscan.io/token/${ row.to }`" class="link cell-text-ellipsis">{{ row.to}}</a>
        </template>
        </el-table-column>
      <el-table-column
        prop="value"
        label="数量"
        width="150">
        <template slot-scope="{row}">
          <span>{{ row.value | tokenValue(row.tokenDecimal) | money}}</span>
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

//  table 头部
const columns = [
  {
    title: '交易哈希',
    dataIndex: 'txhash'
  }
]
export default {
  filters: {
    tokenValue(value, tokenDecimal){
      return Number.parseFloat(Number.parseFloat(value / Math.pow(10, tokenDecimal)).toFixed(5))
    },
    money(value){
      const arr = value.toString().split('.')
      let last = '';
      if(arr.length > 1){
        last ='.' + arr[1];
      }
      return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + last
    }
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
      limit: config.offset
    }
  },
  beforeMount () {
    this.page = 1
    this.loading = true
    this.fetchData((res) => {
      this.loading = false
      if (res.status == '1'){
        this.data = this.data.concat(res.result)
      }else{
        this.$message.error(res.message)
      }
    })
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
    handleInfiniteOnLoad  () {
      this.loading = true
      this.fetchData((res) => {
        this.loading = false
        if (res.status == '1'){
          this.data = res.result
        }else{
          this.$message.error(res.message)
        }
      })
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
.link, .link a, .link a:visited {
    color: #37acf6;
    cursor: pointer;
    text-decoration: none;
}
@media (max-width: 960px) {
  .cell-text-ellipsis{
    max-width: 100px;
  }
}
</style>