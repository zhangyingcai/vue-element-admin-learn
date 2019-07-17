<template>
  <div>
    <div class="list-group f12">
      <HoldersCell v-for="(item, index) in data" :key="index" :celldata="item" :index="index" :limit="limit" :page="page" :celltype="celltype" :address="address"/>
    </div>
  </div>
</template>
<script>
import HoldersCell from './Cell'
export default {
  name: 'HoldersTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    celltype: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  components: {
    HoldersCell
  }
}
</script>
