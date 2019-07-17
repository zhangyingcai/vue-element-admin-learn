<template>
  <div>
    <!-- <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="hash"
        label="哈希">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis max-width" :to="`/txinfo?hash=${row.hash}`">{{row.hash}}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="timeStamp"
        label="时间"
        width="160px">
        <template slot-scope="{row}">
          <span>{{ row.timeStamp | formatTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
        </el-table-column>
      <el-table-column
        prop="from"
        label="发送方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis" :class="{ 'max-width': isTag(row.from, address) }" :to="`/accountinfo/${row.from}`">{{ row.from | showTag(address,tag) }}</router-link>
        </template>
        </el-table-column>
      <el-table-column
        prop="to"
        label="接收方">
        <template slot-scope="{row}">
          <router-link class="link cell-text-ellipsis" :class="{ 'max-width': isTag(row.to, address) }" :to="`/accountinfo/${row.to}`">{{ row.to | showTag(address,tag) }}</router-link>
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
    </el-table> -->
    <HoldersTable v-loading="loading" :data="data" :page="page" :limit="limit" :celltype="celltype" :address="address"/>
    <Pagination :autoScroll="false" :layout="layout" :total="total" :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad" />
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import Pagination from '@/components/Pagination'
import { tokenValue, tokenMoney, showTag } from '../tokenfilters'
import HoldersTable from '../Holders/Table'


export default {
  filters: {
    tokenValue,
    tokenMoney,
    showTag
  },
  props: {
    address: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default:''
    }
  },
  components: {
    Pagination,
    HoldersTable
  },
  data () {
    return {
      data: [],
      loading: false,
      busy: false,
      page: 1,
      limit: 30,
      layout: 'total, prev, next, jumper',
      total: 0,
      celltype: 'Transfers'
    }
  },
  beforeMount () {
    this.page = 1
    this.loading = true
    this.fetchData((res) => {
      this.loading = false
      if (res.status == '1'){
        this.data = this.data.concat(res.result)
        const value = res.balance
        const tag = res.tag
        this.total = res.total
        const message = res.message
        this.$emit('updateTotal', value, tag, message)
      }else{
        this.$message.error(res.message)
      }
    })
  },
  watch: {
    address: function() {
      this.handleInfiniteOnLoad()
    }
  },
  methods: {
    fetchData (callback) {
      reqwest({
        // url: 'https://explorer-web.api.btc.com/v1/eth/tokentxns/0xfdeaa4ab9fea519afd74df2257a21e5bca0dfd3f?page=1&size=10',
        url:  `${config.apiurl}/accountinfo?address=${this.address}&page=${this.page}&limit=${this.limit}`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then(callback).catch((err) => {
        this.loading = false
      })
    },
    handleInfiniteOnLoad  () {
      this.loading = true
      this.fetchData((res) => {
        this.loading = false
        if (res.status == '1'){
          this.data = res.result
          const value = res.balance
          const tag = res.tag
          const message = res.message
          this.total = res.total  
          this.$emit('updateTotal', value, tag, message)
        }else{
          this.$message.error(res.message)
        }
      })
    },
    isTag(value, address){
      let result = value;
      if (value.toLowerCase() == address.toLowerCase()){
        return false
      }
      return true
    }
  },
}
</script>