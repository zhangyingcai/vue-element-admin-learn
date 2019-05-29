// todolist 组件
// 全选按钮/取消全选
// 计数
// 筛选/查询功能
// 总共分为三部分 header/ main section /footer
// header: 输入框, 回车键自动添加数据
<template>
  <section class="todoapp">
    <!-- 语义化 代码-->
    <!-- header -->
    <header class="header">
      <!-- 监听键盘 Enter 按下的时候触发 -->
      <input type="text" class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <ul class="todo-list">
      <to-do v-for="(val, index) in todos" :key="index" :todo="val" 
        @deleteTodo="deleteTodo"
        @toggleTodo="toggleTodo"/>
    </ul>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | capitalize('item') }} left
      </span>
      <ul class="filters">
        <!-- v-for val,key,item -->
        <li v-for="(val, key) in filters" :key="key">
          <!-- todo a 标签的区别 -->
          <!-- 作为一个 a 标签 使用点击事件的 click 时 是否应该阻止默认事件 -->
          <a :class="{selected: visibility === key}" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
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
// 过滤函数
// 已经完成的 done = true
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

import ToDo from './ToDo'
export default {
  // Failed to resolve filter 是哪个地方有问题？

  filters: {
    // 一个首字母大写的过滤器
    //  使用这个方法会报错 str.toUpperCase is not a function
    // 过滤器可以在 花括号 和 v-bind 表达式使用 总是接收表达式的值为第一个参数 后面接收到参数依次顺延
    capitalize: (n,str) => (typeof n) === 'string' ? n.charAt(0).toUpperCase() + n.slice(1) : str.charAt(0).toUpperCase() + str.slice(1)
  },
  components: { ToDo },
  data() {
    return {
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList,
      visibility: 'all', // 用于控制选择的按钮
      filters
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    // 方法默认转 event 对象
    addTodo(e) {
      const text = e.target.value
      // str.prototype.trim() 方法用于去除首尾的 space
      // return 一个新的字符串
      const valitext = text.trim()
      if (valitext) {
        this.todos.push({
          text: valitext,
          done: false
        })
      }
      e.target.value = ''
    },
    deleteTodo(val) {
      // 怎么样删除一个元素
      this.todos.splice(this.todos.indexOf(val),1)
    },
    toggleTodo(todo) {
      // 怎么修改一个元素
      todo.done = !todo.done
    }
  }
}
</script>
<style lang="scss">
// 在 css 中使用 import 需要添加 @符号
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import
@import './todo.scss';
</style>
