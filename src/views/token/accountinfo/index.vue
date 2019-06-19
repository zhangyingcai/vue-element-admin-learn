<template>
  <div>
    <el-header class="header-boxshaw">
      <div class="header">
        <router-link class="head-link" to="/">
          <img
            class="bcat-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3NTNBNDNGODgyNTExRTlBMUZEOTJDNkNCNUVFQjc4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3NTNBNDQwODgyNTExRTlBMUZEOTJDNkNCNUVFQjc4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTc1M0E0M0Q4ODI1MTFFOUExRkQ5MkM2Q0I1RUVCNzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTc1M0E0M0U4ODI1MTFFOUExRkQ5MkM2Q0I1RUVCNzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6grTyMAAAQg0lEQVR42rxa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"
            alt="bcat"
          >
          <span>大猫城堡通用积分(BCAT)数据浏览器</span>
        </router-link>
      </div>
    </el-header>
    <div class="page-container">
      <el-tabs v-model="activeName" class="mytabs">
        <el-tab-pane label="地址信息" name="txinfo">
          <el-card class="text-left mycard mb-1">
            <div slot="header">
              <span class="all">持有BCAT</span>
              <br>
              <div class="all pt-1">{{total | tokenValue(tokenDecimal) | tokenMoney}}</div>
            </div>
            <div class="pb-1">
              <span class="all">当前地址</span>
              <br>
              <div class="address cell-text-ellipsis">
                <span class="link">{{address}}</span>
              </div>
            </div>
            <div class="pb-1">
              <span class="all">地址信息</span>
              <br>
              <div class="address">
                <span class="black" v-if="tag">{{ tag }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="流动信息" name="transfers">
          <AccountInfoTable :address="address" :tag="tag" @updateTotal="updateTotal"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AccountInfoTable from './AccountInfoTable'
import reqwest from 'reqwest'
import config from '@/config/index'
import { tokenValue, tokenMoney } from '../tokenfilters'
export default {
  components: {
    AccountInfoTable
  },
  filters: {
    tokenValue,
    tokenMoney
  },
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'txinfo',
      total: 0.0,
      contractaddress: config.contractaddress,
      tokenDecimal: 18,
      tag: ''
    }
  },
  methods: {
    updateTotal(value, tag) {
      this.total = value
      this.tag = tag
    }
  }
}
</script>
<style scoped>
.mycard {
  height: 100%;
  padding: 5px;
  border-radius: 15px;
}
.el-tabs--border-card,
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(146, 137, 255, 0.2);
}
.mytabs {
  margin-top: 20px;
  padding: 0 15px;
  border-radius: 15px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(146, 137, 255, 0.2);
}
.mycardh {
  margin-bottom: 15px;
}
.mycard .address {
  margin: 15px 0;
}
.header,
.page-container {
  width: 1140px;
  margin: 0 auto;
}
.page-container {
  padding: 20px;
}
@media (max-width: 1140px) {
  .header,
  .page-container {
    width: auto;
  }
}
.header {
  background-color: white;
  border-bottom: 1px solid #ebeef5;
  padding: 18px 0;
}
.header-boxshaw {
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 30px;
  color: #692fdc;
  padding: 10px 5px;
}
.all {
  font-size: 20px;
  color: #000;
}
.pt-1 {
  padding-top: 15px;
}
.line {
  display: inline-block;
  width: 1px;
  height: 15px;
  margin: 2px 0 0;
  background-color: #ddd;
}
.bcat-img {
  display: inline-block;
  width: 25px;
  vertical-align: middle;
}
</style>
