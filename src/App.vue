<template>
  <div id="app">
    <keep-alive exclude="['txinfo']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
