<template>
  <div id="app">
    <input type="text" placeholder="Количество записей">
    <input type="text" placeholder="Записей на странице">
    <input type="text" placeholder="Набор слов">
    <VueTable></VueTable>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      VueTable: () => import('./components/VueTable')
    }
  }
</script>

<style lang="scss">

</style>
