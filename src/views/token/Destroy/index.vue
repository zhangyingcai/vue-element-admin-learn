<template>
  <div>
    <!-- <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column prop="value" label="销毁数量" width="160px">
        <template slot-scope="{row}">
          <span>- {{ row.value | tokenMoney}} BCAT</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="hash">
        <template slot-scope="{row}">
          <router-link class="link" :to="`/txinfo?id=${row.id}`">
            <div class="cell-text-ellipsis max-width link">
              <span>{{ row.hash }}</span>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeStamp"
        label="销毁时间"
        width="150">
        <template slot-scope="{row}">
          <span>{{ row.timeStamp | formatTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="message" label="销毁原因" width="300">
        <template slot-scope="{row}">
          <span v-html="row.message"></span>
        </template>
      </el-table-column>
    </el-table> -->
    <HoldersTable v-loading="loading" :data="data" :page="page" :limit="limit" :celltype="celltype"/>
    <Pagination :autoScroll="false" :layout="layout" :total="total" :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad"/>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import Pagination from '@/components/Pagination'
import { tokenMoney } from '../tokenfilters'
import HoldersTable from '../Holders/Table'

export default {
  name: 'Destroy',
  filters: {
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
      celltype: 'Destroy'
    }
  },
  created() {
    this.page = 1
    this.loading = true
    this.fetchData(res => {
      this.loading = false
      if (res.code === 1) {
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
        url: `${config.apiurl}/destroy/list?page=${this.page}&limit=${this.limit}`,
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
        if (res.code === 1  ) {
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