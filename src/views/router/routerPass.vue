<template>
  <div class="app-container">
    <ul>
      <li>
        $route.params.name: {{ value }}
      </li>
      <li>
        props.name: {{ name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.$route.params.name
    }
  },
  methods: {
    passValue() {
      this.router.push({ path: '/routePass', params: { name: 'dd' }})
    }
  }
}
</script>
