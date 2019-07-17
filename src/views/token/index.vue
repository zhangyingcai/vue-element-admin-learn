<template>
  <div>
    <Header />
    <div v-loading="loading" class="page-container">
      <div class="mt-1 ml-1 mr-1 white-bg">
        <div>
          <svg-icon class="ml-1 mt-1" icon-class="broadcast" />
          <a href="https://www.bcat.one/archives/category/tz" class="fr link mt-1 mr-1" target="_blank">more >></a>
        </div>
        <el-row>
          <el-col v-for="(item, index) in bcatone" :key="index" class="ml-1 mr-1" :lg="7" :xs="22">
            <div class="li">
              <el-row class="myrow">
                <el-col :span="20">
                  <a class="link message nomal-cell-text-ellipsis" :href="item.link" target="_blank">{{ item.title.rendered }}</a>
                </el-col>
                <el-col :span="4">
                  <span class="message home-text">({{ new Date(item.date).getTime() | formatTime('{m}-{d}') }})</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="text-center"><a href="https://www.bcat.one/archives/category/tz" class="link" target="_blank">...</a></el-row>
        <el-row class="lh-1 f14">
          <el-col :xs="12" :lg="6" class="flex-box text-center">
            <svg-icon class="margin-auto home-img" icon-class="lc" />
            <span class="home-num">{{ currentTotal | tokenMoney }}</span>
            <span class="home-text">实际流通量</span>
          </el-col>
          <el-col :xs="12" :lg="6" class="flex-box text-center">
            <svg-icon class="margin-auto home-img" icon-class="zkpt" />
            <span class="home-num">{{ total | tokenMoney }}</span>
            <span class="home-text">当前理论总量</span>
          </el-col>
          <el-col :xs="12" :lg="6" class="flex-box text-center">
            <svg-icon class="margin-auto home-img" icon-class="ranshao" />
            <span class="home-num">{{ clearTotal | tokenMoney }}</span>
            <span class="home-text">已通缩销毁量</span>
          </el-col>
          <el-col :xs="12" :lg="6" class="flex-box text-center">
            <svg-icon class="margin-auto home-img" icon-class="hetong" />
            <span class="home-num cell-text-ellipsis">{{ address }}</span>
            <span class="home-text"><a :href="`https://etherscan.io/address/${address}`" class="link">合约地址</a></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :lg="6" class="flex-box text-center f14">
            <svg-icon class="margin-auto home-img" icon-class="shuoming" />
            <span class="home-num">BCAT说明书</span>
            <span><a href="https://www.bcat.one/paper" class="link" target="_blank">详细了解BCAT</a></span>
          </el-col>
          <el-col :xs="12" :lg="6" class="flex-box text-center">
            <svg-icon class="margin-auto home-img" icon-class="fortawesome" />
            <span class="home-num">大猫城堡</span>
            <span><a href="https://bcathub.com" class="link f14">下载城堡APP</a></span>
          </el-col>
        </el-row>
      </div>
      <el-tabs v-model="activeName" class="mt-1 ml-1 mr-1 white-bg pr-1 pl-1">
        <el-tab-pane label="排行榜" name="holders">
          <keep-alive>
            <Holders />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="流动信息" name="transfers">
          <keep-alive>
            <Transfers />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="常用地址" name="address">
          <keep-alive>
            <Address />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="销毁记录" name="destroy">
          <keep-alive>
            <Destroy />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <CommonFooter></CommonFooter> -->
    <Footer />
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
import Footer from './components/Footer'
// import CommonFooter from './CommonFooter'
import { tokenValue, tokenMoney } from './tokenfilters'
export default {
  name: 'Token',
  filters: {
    tokenValue,
    tokenMoney
  },
  components: {
    Transfers,
    Holders,
    Address,
    Destroy,
    Header,
    Footer
  },
  data() {
    return {
      activeName: 'holders',
      total: 439165535, // 合约地址总量
      address: config.contractaddress,
      apptotal: 265562045, // 官方地址总量
      page: 1,
      limit: 1,
      tokenDecimal: config.tokenDecimal,
      currentTotal: 0,
      bcatone: [],
      loading: false
    }
  },
  computed: {
    clearTotal: function() {
      return 1000000000 - this.total
    }
  },
  watch: {
    activeName: function(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    this.getCurrentTotal()
  },
  beforeMount() {
    this.getTokenSupply()
    this.getAppSupply()
    this.getBcatone()
  },
  methods: {
    getTokenSupply() { // 获取token 供给量
      reqwest({
        url: config.apiurl + '/tokensupply',
        type: 'json',
        method: 'get',
        crossOrigin: true,
        success: res => {
          if (res.status === '1') {
            this.total = tokenValue(res.result, this.tokenDecimal)
          }
        }
      })
    },
    getAppSupply() { // 获取官方地址数量
      reqwest({
        url: `${config.apiurl}/accountinfo?address=${config.appeth}&page=${this.page}&offset=${this.limit}`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then((res) => {
        if (res.status === '1') {
          this.apptotal = tokenValue(res.balance, this.tokenDecimal)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getCurrentTotal() {
      reqwest({
        url: `${config.apiurl}/currency`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then((res) => {
        if (res.status === '1') {
          this.currentTotal = res.result
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getBcatone() {
      this.loading = true
      reqwest({
        url: `https://www.bcat.one/wp-json/wp/v2/posts?categories=4`,
        type: 'json',
        method: 'get',
        crossOrigin: true
      }).then((res) => {
        if (res.length > 3) {
          this.bcatone = res.slice(0, 3)
        } else {
          this.bcatone = res.slice(0, res.length)
        }
      }).always(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
.el-tabs__nav-next, .el-tabs__nav-prev{
  color: #37acf6;
}
.message{
  line-height: 1.5;
  font-size: .75rem;
}
.flex-box{
  display:flex;
  flex-direction: column;
  padding: 1.5rem;
}
.home-img{
  font-size: 28px;
}
.home-num{font-size: 1rem;font-weight: 700;}
.li::before{content: "·";font-size: 20px;font-weight: 700;margin-right: 10px;vertical-align: middle;}
.myrow{display:inline-block;width:90%;vertical-align: middle;}
</style>
