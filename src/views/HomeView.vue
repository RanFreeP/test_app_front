<template>
  <div class="container">
  <TableComponent
  />
  </div>
</template>

<script>


import TableComponent from "@/components/TableComponent";

export default {
  name: "HomeView",
  components: {TableComponent},
  computed: {

    data() {
      return {}
    },
  }
}
</script>

<style scoped>

</style>