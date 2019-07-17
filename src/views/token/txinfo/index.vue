<template>
  <div>
    <Header/>
    <div v-loading="loading" class="page-container">
      <el-card class="mt-1 ml-1 mr-1 white-bg">
        <el-row :gutter="20">
          <el-col :span="8">交易hash:</el-col>
          <el-col :span="16"><div class="link nomal-cell-text-ellipsis">{{hash || hashinfo.hash}}</div></el-col>
        </el-row>
        <div v-if="nodata && hash">
          <el-row :gutter="20">
            <el-col :span="8">所在区块:</el-col>
            <el-col :span="16">{{hashinfo.blockNumber}}({{hashinfo.confirmations}}个确认数)</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">时间:</el-col>
            <el-col :span="16">{{hashinfo.timeStamp | formatTime }}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">发送方:</el-col>
            <el-col :span="16">
              <router-link
                class="link nomal-cell-text-ellipsis"
                :to="`/accountinfo/${hashinfo.from}`"
              >{{hashinfo.from}}</router-link>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">接收方:</el-col>
            <el-col :span="16">
              <router-link
                class="link nomal-cell-text-ellipsis"
                :to="`/accountinfo/${hashinfo.to}`"
              >{{hashinfo.to}}</router-link>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">数量:</el-col>
            <el-col
              :span="16"
            >{{hashinfo.value | tokenValue(hashinfo.tokenDecimal) | tokenMoney}} BCAT</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">手续费:</el-col>
            <el-col :span="16">{{ (hashinfo.gasPrice*hashinfo.gasUsed) | tokenValue(18)}} ETH</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">Gas 限额:</el-col>
            <el-col :span="16">{{hashinfo.gas}}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">Gas 消耗:</el-col>
            <el-col :span="16">{{hashinfo.gasUsed}}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">Gas 价格:</el-col>
            <el-col :span="16">{{hashinfo.gasPrice | tokenValue(9)}} Gwei</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">Nonce;{Position}:</el-col>
            <el-col :span="16">{{hashinfo.nonce}}({{hashinfo.transactionIndex}})</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">输入数据:</el-col>
            <el-col :span="16" class="textwrap">{{hashinfo.input}}</el-col>
          </el-row>
        </div>
        <div v-if="id && nodata">
          <el-row :gutter="20">
            <el-col :span="8">时间:</el-col>
            <el-col :span="16">{{hashinfo.timeStamp | formatTime('{y}-{m}-{d}') }}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">数量:</el-col>
            <el-col
              :span="16"
            >{{hashinfo.value | tokenMoney}} BCAT</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">销毁原因:</el-col>
            <el-col
              :span="16"
              v-html="hashinfo.message"
              class="textwrap lh-1"
            ></el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import config from '@/config/index'
import { tokenValue, tokenMoney } from '../tokenfilters'
import { truncate } from 'fs';
import Header from '../components/Header'
export default {
  name: 'token',
  filters: {
    tokenValue,
    tokenMoney
  },
  components: {
    Header
  },
  props: {
    hash: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      nodata: false,
      hashinfo: {
        blockNumber: '',
        from: '',
        to: '',
        timeStamp: '',
        tokenDecimal: '',
        value: '',
        cumulativeGasUsed: '',
        gas: '',
        gasUsed: '',
        gasPrice: '',
        nonce: '',
        transactionIndex: '',
        input: '',
        message: '',
        hash: ''
      },
      destroyAction: '/destroy/info',
      txinfoAction: '/txinfo'
    }
  },
  beforeMount() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      let url = `${config.apiurl}${this.txinfoAction}?hash=${this.hash}`
      if (this.id) {
        url = `${config.apiurl}${this.destroyAction}?id=${this.id}`
      }
      console.log(url)
      reqwest({
        url: url,
        type: 'json',
        method: 'get',
        crossOrigin: true
      })
        .then(res => {
          this.loading = false
          if (res.status === '1' || res.code === 1) {
            Object.assign(this.hashinfo, res.result)
            this.nodata = true
          } else {
            this.$message.error(res.message)
          }
        })
        .always(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.textwrap {
  word-wrap: break-word;
}
</style>
