<template>
  <div id="app">
    <input
      v-model="numberOfRecords"
      type="text"
      placeholder="Количество записей"
      class="form-control"
    >
    <input
      v-model="recordsPerPage"
      type="text"
      placeholder="Записей на странице"
      class="form-control"
    >
    <input
      v-model="randWords"
      type="text"
      placeholder="Набор слов"
      class="form-control"
    >
    <button
      class="btn btn-primary"
      @click="confirm()"
    >
      Применить
    </button>
    <button
      v-if="resetVisible"
      class="btn btn-secondary"
      @click="reset()"
    >
      Сбросить
    </button>
    <VueTable
      :elements-per-page="elementsPerPage"
      :rows="rows"
    />
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      VueTable: () => import('./components/VueTable')
    },
    data() { return {
      rows: [
        {id: 1, title: 'Example', rand: 'Example'},
        {id: 2, title: 'Example', rand: 'Example'},
        {id: 3, title: 'Example', rand: 'Example'},
        {id: 4, title: 'Example', rand: 'Example'},
        {id: 5, title: 'Example', rand: 'Example'},
      ],
      elementsPerPage: 5,
      recordsPerPage: '',
      numberOfRecords: '',
      randWords: '',
      resetVisible: false
    }},
    methods: {
      confirm() {
        const generateTableData = () => {
          const arr = []

          const random = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
          }

          const words = this.randWords.split(',')

          for (let i = 1; i <= +this.numberOfRecords; i++) {
            arr.push({id: i, title: `name${i}`, rand: words[random(0, words.length - 1)]})
          }

          return arr
        }

        this.rows = generateTableData()
        this.resetVisible = true
        this.elementsPerPage = +this.recordsPerPage
      },

      reset() {
        this.resetVisible = false
        this.recordsPerPage = ''
        this.numberOfRecords = ''
        this.randWords = ''
        this.elementsPerPage = 1
        this.rows = []
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
