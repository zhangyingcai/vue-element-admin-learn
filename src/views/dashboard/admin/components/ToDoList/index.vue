// todolist 组件
// 全选按钮/取消全选
// 计数
// 筛选/查询功能
// 总共分为三部分 header/ main section /footer
// header: 输入框, 回车键自动添加数据
<template>
  <section class="todoapp">
    <!-- 语义化 代码-->
    <header class="header">
      <!-- 监听键盘 Enter 按下的时候触发 -->
      <input type="text" class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter = "addTodo">
    </header>
  </section>
</template>
<script>
//  默认数据
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default {
  data() {
    return {
      todos: defalutList
    }
  },
  methods: {
    // 方法默认转 event 对象
    addTodo(e) {
      const text = e.target.value
      // str.prototype.trim() 方法用于去除首尾的 space
      // return 一个新的字符串
      const valitext = text.trim()
      if(valitext){
        this.todos.push({
          text: valitext,
          done: false
        })
      }
      e.target.value = ''
    }
  }
}
</script>
<style lang="scss">
// 在 css 中使用 import 需要添加 @符号
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import
@import './todo.scss';
</style>
