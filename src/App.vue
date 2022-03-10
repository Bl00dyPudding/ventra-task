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
    <vc-donut
      v-if="sections.length > 0"
      :size="200" unit="px" :thickness="100"
      hasLegend legendPlacement="bottom"
      :sections="sections" :total="100"
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
      resetVisible: false,
      sections: [
        { label: 'Example', value: 100, color: this.randomColor() }
      ]
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
            const generatedWord = words[random(0, words.length - 1)].trim()
            arr.push({id: i, title: `name${i}`, rand: generatedWord})
          }

          return arr
        }

        this.rows = generateTableData()
        this.resetVisible = true
        this.elementsPerPage = +this.recordsPerPage

        const generateChartData = () => {
          const result = this.rows.map(el => el.rand).reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1
            return acc
          }, {})

          const sections = []
          const total = this.rows.length

          for (const key in result) {
            sections.push({ label: key, value: (result[key] / total * 100), color: this.randomColor() })
          }

          return sections
        }

        this.sections = generateChartData()
      },

      reset() {
        this.resetVisible = false
        this.recordsPerPage = ''
        this.numberOfRecords = ''
        this.randWords = ''
        this.elementsPerPage = 1
        this.sections = []
        this.rows = []
      },

      randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
      }
    }
  }
</script>

<style scoped>

</style>
