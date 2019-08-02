<template>
  <section>
    <header>
      <el-button>全选</el-button>
      <input type="text" v-model="todo" @keyup.enter="addToDo"/>
    </header>
    <section>
      <div v-for="(item, index) in filter[active](todos)" :key="index">
        <input type="checkbox" :checked="item.done" @change="changeToDo(item)">
        <span>{{item.text}}</span>
      </div>
    </section>
    <footer>
      <span>{{ filter['completed'](todos).length }}</span>
      <div v-for="(item, index) in filter" :key="index" @click="change(index)">{{index}}</div>
    </footer>
  </section>
</template>
<script>
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
const filter = {
  all: todos => todos,
  completed: todos => todos.filter(v=>v.done),
  actived: todos => todos.filter(v=>!v.done)
}
export default {
  name: 'mytodolist',
  data() {
    return {
      todos: defalutList,
      active: 'all',
      filter,
      todo: ''
    }
  },
  methods: {
    addToDo(e) {
      console.log(e)
      const value = e.target.value
      const valitext = value
      if (valitext) {
        this.todos.push({
          text: valitext,
          done: false
        })
      }
    },
    change(index) {
      this.active = index
    },
    changeToDo(item) {
      item.done = !item.done
    }
  }
}
</script>