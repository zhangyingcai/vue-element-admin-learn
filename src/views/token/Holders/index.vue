<template>
  <div>
    <!-- <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column>
        <template slot-scope="row">
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 1" icon-class="first"></svg-icon>
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 2" icon-class="second"></svg-icon>
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 3" icon-class="third"></svg-icon>
          <span v-if="(row.$index+1+(page-1?page-1:0)*limit) > 3">{{row.$index+1+(page-1?page-1:0)*limit}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="排名" width="50">
        <template slot-scope="row">
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 1" icon-class="first"></svg-icon>
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 2" icon-class="second"></svg-icon>
          <svg-icon v-if="(row.$index+1+(page-1?page-1:0)*limit) == 3" icon-class="third"></svg-icon>
          <span v-if="(row.$index+1+(page-1?page-1:0)*limit) > 3">{{row.$index+1+(page-1?page-1:0)*limit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope="{row}">
          <router-link class="link" :to="`/accountinfo/${row.address}`">
            <div class="cell-text-ellipsis" :class="{ 'max-width': !row.tag }">
              <span v-if="!row.tag">{{ row.address }}</span>
              <span v-if="row.tag">{{ row.tag }}</span>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="数量" width="140px">
        <template slot-scope="{row}">
          <span>{{ row.value | tokenValue(row.tokenDecimal) | tokenMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="percentage" label="流通量百分比" width="130px">
        <template slot-scope="{row}">
          <span>{{ row.address === appeth ? '不计入流通量' : row.percentage }}</span><span v-if="row.address !== appeth">%</span>
        </template>
      </el-table-column> -->
    <!-- </el-table> -->
    <HoldersTable v-loading="loading" :data="data" :page="page" :limit="limit" :celltype="celltype"/>
    <Pagination :autoScroll="false" :layout="layout" :total="total" :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad"/>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import Pagination from '@/components/Pagination'
import HoldersTable from './Table'
import { tokenValue, tokenMoney } from '../tokenfilters'

export default {
  name: 'Holders',
  filters: {
    tokenValue,
    tokenMoney
  },
  components: {
    Pagination,
    HoldersTable
  },
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      page: 1,
      limit: 30,
      layout: 'total, prev, next, jumper',
      total: 0,
      appeth: config.appeth,
      celltype: 'Holders'
    }
  },
  created() {
    this.page = 1
    this.loading = true
    this.fetchData(res => {
      this.loading = false
      if (res.status == '1') {
        this.data = this.data.concat(res.result)
        this.total = res.total
      } else {
        this.$message.error(res.message)
      }
    })
  },
  methods: {
    fetchData(callback) {
      reqwest({
        // url: 'https://explorer-web.api.btc.com/v1/eth/tokentxns/0xfdeaa4ab9fea519afd74df2257a21e5bca0dfd3f?page=1&size=10',
        url: `${config.apiurl}/holders?sort=${config.sort}&page=${this.page}&limit=${this.limit}`,
        type: 'json',
        method: 'get',
        // contentType: 'json',
        crossOrigin: true
      }).then(callback,function(){
      }).always(()=>{
        this.loading = false;
      })
    },
    handleInfiniteOnLoad() {
      this.loading = true
      this.fetchData(res => {
        this.loading = false
        if (res.status == '1') {
          this.data = res.result
          this.total = res.total
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>