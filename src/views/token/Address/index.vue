<template>
  <div>
    <el-row class="pb-1" :gutter="12">
      <el-col :span="8">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1">
            <svg-icon class="big-svg" icon-class="bcat-logo"></svg-icon>
          </div>
          <router-link class="link" :to="`/accountinfo/${config.appeth}`">BCAT官方地址</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1">
            <svg-icon class="big-svg" icon-class="otcbtc"></svg-icon>
          </div>
          <router-link class="link" :to="`/accountinfo/${config.otcbtceth}`">OTCBTC地址</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1">
            <svg-icon class="big-svg" icon-class="bcat-destroy"></svg-icon>
          </div>
          <router-link class="link" :to="`/accountinfo/${config.cleareth}`">BCAT销毁地址</router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import config from '@/config/index'
export default {
  data(){
    return {
      config: config
    }
  }
}
</script>
<style scoped>
.big-svg{
  font-size: 55px;
}
.myradius{
  border-radius: 15px;
  padding: 0;
}
.link{
  display: block;
  text-decoration: none;
  padding-top: 20px;
  border-top: 1px solid #ececec;
}
</style>
