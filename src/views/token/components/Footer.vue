<template>
  <div>
    <footer class="site-footer">
      <div class="text-center">
        <a class="site-info" href="http://paper.bcat.one/archives/222">BCAT通用积分免责声明</a>
        <div>
          <svg-icon class="site-info" icon-class="xinaixin" />
          <span class="site-info" @click="handleCopy($event)">捐赠与支持：{{ address }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import clip from '@/utils/clipboard'
import config from '@/config/index'
export default {
  name: 'Footer',
  data() {
    return {
      address: config.donationeth
    }
  },
  methods: {
    handleCopy(event) {
      clip(this.address, event)
    }
  }
}
</script>
<style scoped>
.site-footer {
  background-color: #fff;
  border-top: 1px solid rgba(51, 51, 51, 0.1);
  padding: 20px;
  margin-top: 1rem;
}
.site-info {
  color: rgba(51, 51, 51, 0.7);
  font-size: .75rem;
  line-height: 1.5;
  text-decoration: none;
}
</style>
