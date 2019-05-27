<template>
  <count-to :startVal="1000" :endVal="13445555" :duration="3000"></count-to>
</template>
<script>
import CountTo from 'vue-count-to';
export default {
  name: 'CountToUser',
  components: { CountTo }
}
</script>