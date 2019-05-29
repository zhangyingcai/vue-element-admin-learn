<template>
  <li class="todo">
    <div class="view">
      <input :checked="todo.done" type="checkbox" class="toggle">
      <label>{{todo.text}}</label>
      <!-- .todoapp .todo-list li:hover .destroy {display:block;} -->
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
  </li>
</template>
<script>
export default {
  name: 'ToDo',
  props: {
    // 传入一个对象
    // 设置默认值的时候记得返回一个空对象 ToDo why？
    // 如果属性都是小写的话则不用 to-do
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    deleteTodo(val) {
      // $emit 进行父子传值
      this.$emit('deleteTodo', val)
    }
  }
}
</script>