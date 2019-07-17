<template>
  <div>
    <div class="header-boxshaw">
      <div class="header">
        <router-link class="head-link" to="/">
          <svg-icon class="bcat-logo" icon-class="bcat-logo"/>
          <span style="font-weight:700;font-size:22px;">BCAT积分浏览器</span>
        </router-link>
        <el-button @click="onClick" class="mini"><svg-icon class="f20" icon-class="menu"></svg-icon></el-button>
      </div>
    </div>
    <ul v-show="isactive" class="nav-list">
      <li class="nav-list-item">
        <img src="https://www.bcat.one/wp-content/uploads/2018/10/icon_0011_首页_1.png" alt="" width="22" height="22">
	      <a href="/">BCAT浏览器首页</a>
      </li>
      <li class="nav-list-item">
        <img src="https://www.bcat.one/wp-content/uploads/2018/10/icon_0009_社区_1.png" alt="" width="22" height="22">
	      <a href="https://www.bcat.one">BCAT官网</a>
      </li>
      <li class="nav-list-item">
        <img src="https://www.bcat.one/wp-content/uploads/2018/10/icon_0001_发现_1.png" alt="" width="22" height="22">
	      <a href="https://www.bcat.one/paper">产品说明白皮书</a>
      </li>
      <li class="nav-list-item">
        <img src="https://www.bcat.one/wp-content/uploads/2018/10/icon_0007_圈子_1.png" alt="" width="22" height="22">
	      <a href="https://www.bcat.one/archives/category/tz">BCAT公告</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      isactive: false
    }
  },
  methods: {
    onClick() {
      this.isactive = !this.isactive
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 1140px;
  margin: 0 auto;
  height: 95px;
}
.nav-list,
.mini{display: none}

@media (max-width: 1140px) {
  .header {
    width: 100%;
  }
  .nav-list{display: block;}
  .mini{display: inline-block;}
}
.header {
  position: relative;
  display: table;
  background-color: white;
  /* border-bottom: 1px solid #ebeef5; */
}
.head-link{
  display: table-cell;
  vertical-align: middle;
  padding-left: 25px;
}
.header-boxshaw {
  background-color: #ffffff;
  border-bottom: 1px solid #eee
}
.bcat-img {
  display: inline-block;
  width: 25px;
  vertical-align: middle;
}
.f20{ font-size: 20px }
.mini{ 
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translate(-2%,-50%);  
  -ms-transform: translate(-2%,-50%);
  transform: translate(-2%,-50%);
  height: 42px;
  width: 42px;
  padding: 0;
}
.nav-list{
  list-style: none;
  background-color: #fff;
  padding: 0 7.6923%;
  margin: 0;
}
.nav-list-item{
  &>img{
    vertical-align: middle;
  }
  &>a{
    color: #333;
    vertical-align: middle;
    text-decoration: none;
  }
  border-bottom: 1px solid #eee;
  padding: 1.25rem 0;
  font-size: 1rem;
}
.bcat-logo{
  font-size: 28px;
  // vertical-align: middle;
}
</style>