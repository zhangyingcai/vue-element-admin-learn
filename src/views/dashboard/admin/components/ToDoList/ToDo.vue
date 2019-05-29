<template>
  <!-- 多个class 会被合并吗 -->
  <li :class="{ completed: todo.done, editing: editing}" class="todo">
    <div class="view">
      <input :checked="todo.done" type="checkbox" class="toggle" @change="toggleTodo(todo)">
      <!-- 双击编辑 socool -->
      <label @dblclick="editing = true">{{todo.text}}</label>
      <!-- .todoapp .todo-list li:hover .destroy {display:block;} -->
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <!-- 通过 editing 进行属性切换 -->
    <!-- 通过 keyup.esc 监听到 esc 取消焦点 -->
    <!-- 失去焦点之后 blur -->
    <input v-show="editing"
      v-focus = "editing"
      :value="todo.text" type="text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>
<script>
export default {
  name: 'ToDo',
  directives: {
    // 自定义指令 focus 在下次数据更新之后默认 focus
    focus(el, { value }, { context }){
      if (value) {
        context.$nextTick(()=>{
          el.focus()
        })
      }
    }
  },
  props: {
    // 传入一个对象
    // 设置默认值的时候记得返回一个空对象 ToDo why？
    // 如果属性都是小写的话则不用 to-do
    // Html 中的特性名时大小写不敏感的
    // camelCase 驼峰命名法的 prop名需要使用等价的 kebab-case 短横线分隔命名
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      //  编辑状态
      editing: false
    }
  },
  methods: {
    deleteTodo(val) {
      // $emit 进行父子传值
      this.$emit('deleteTodo', val)
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
      // v-bind 是单向绑定
      console.log(todo.done)
      // 父组件属性传递到子组件，这个属性对于两者是什么关系呢？
      // 为什么我修改了子组件的属性，父组件的属性也进行了相应的改变，属性传递的时候对象是浅拷贝吗 原始类型呢
      // 原始类型在子组件中是不允许修改的
      // 对象类型，因为是浅拷贝的原因，可以在子组件进行修改，但是不可取
      // 答案： 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解
      // 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告
      // 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态
      // todo.done = !todo.done
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {
      // cancle 恢复数据
      e.target.value = this.todo.text
      this.editing = false
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
  }
}
</script>