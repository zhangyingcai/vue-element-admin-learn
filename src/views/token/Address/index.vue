<template>
  <div class="mt-1 ml-1 mr-1">
    <el-row :gutter="12">
      <el-col :lg="8" xs="24" class="pb-1">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1 bordert-1">
            <svg-icon class="big-svg" icon-class="bcat-logo" />
          </div>
          <router-link class="link" :to="`/accountinfo/${config.appeth}`">BCAT官方地址</router-link>
        </el-card>
      </el-col>
      <el-col :lg="8" xs="24" class="pb-1">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1 bordert-1">
            <svg-icon class="big-svg" icon-class="otcbtc" />
          </div>
          <router-link class="link" :to="`/accountinfo/${config.otcbtceth}`">OTCBTC地址</router-link>
        </el-card>
      </el-col>
      <el-col :lg="8" xs="24" class="pb-1">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1 bordert-1">
            <svg-icon class="big-svg" icon-class="bcat-destroy" />
          </div>
          <router-link class="link" :to="`/accountinfo/${config.cleareth}`">BCAT预销毁地址</router-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="pb-1" :gutter="12">
      <el-col :lg="8" xs="24" class="pb-1">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1 bordert-1">
            <svg-icon class="big-svg" icon-class="bigONE" />
          </div>
          <router-link class="link" :to="`/accountinfo/${config.bigoneeth}`">BigONE地址</router-link>
        </el-card>
      </el-col>
      <el-col :lg="8" xs="24">
        <el-card class="text-center myradius" shadow="hover">
          <div class="pb-1 bordert-1">
            <svg-icon class="big-svg" icon-class="mixin" />
          </div>
          <a href="https://mixin.one/snapshots/94d6c6a3-3d3b-35f9-ae76-bbaa94c0caa9" class="link">Mixin</a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import config from '@/config/index'
export default {
  name: 'Address',
  data() {
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
  display: inline-block;
  text-decoration: none;
  margin-top: 20px;
}
.bordert-1{
  border-bottom: 1px solid #ececec;
}
</style>
