<template>
  <div>
    <el-table :data="data" v-loading="loading" fit highlight-current-row style="width: 100%">
      <el-table-column label="排名" width="80">
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
            <div class="cell-text-ellipsis">{{ row.address }}
              <span class="black" v-if="row.tag">({{ row.tag }})</span>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="数量" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.value | tokenValue(row.tokenDecimal) | money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="percentage" label="流通量百分比" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.address === appeth ? '不计入流通量' : row.percentage }}</span><span v-if="row.address !== appeth">%</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :page.sync="page" :limit.sync="limit" @pagination="handleInfiniteOnLoad"/>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import Pagination from '@/components/Pagination'

export default {
  filters: {
    tokenValue(value, tokenDecimal) {
      return Number.parseFloat(
        Number.parseFloat(value / Math.pow(10, tokenDecimal)).toFixed(5))
    },
    money(value){
      const arr = value.toString().split('.')
      let last = ''
      if(arr.length > 1){
        last = '.' + arr[1]
      }
      return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + last
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      page: 1,
      limit: config.offset,
      total: 0,
      appeth: config.appeth
    }
  },
  beforeMount() {
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
        url: `${config.apiurl}?sort=${config.sort}&page=${this.page}&limit=${this.limit}`,
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
.cell-text-ellipsis {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.link,
.link a,
.link a:visited {
  color: #37acf6;
  cursor: pointer;
  text-decoration: none;
}
@media (max-width: 960px) {
  .cell-text-ellipsis {
    max-width: 100px;
  }
}
</style>