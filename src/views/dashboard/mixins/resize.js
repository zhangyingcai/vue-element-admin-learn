import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_sidebarElm: null
    }
  },
  mounted() {// 实例挂载之后调用
    this.$_initResizeEvent() // 初始化
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy() {// 销毁之前调用 ，销毁定时器、settimeout等
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() { // 使用防抖函数
      return debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)()
    },
    $_initResizeEvent() { 
      // 为什么是 resize 方法 难道是浏览器自带的钩子？
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
