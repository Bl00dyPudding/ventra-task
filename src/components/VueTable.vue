<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col"
          class="table-header"
          @click="sortTable(col)"
        >
          {{ col }}
          <i
            v-if="col === sortColumn"
            :class="['bi', ascending ? 'bi-arrow-up' : 'bi-arrow-down']"
          />
        </th>
      </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in shownRows"
          :key="row.id"
        >
          <td
            v-for="col in columns"
            :key="col"
          >
            {{ row[col] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center">
      <ul class="pagination">
        <li
            v-for="i in numPages"
            :key="i"
            :class="['page-item', { 'active': i === currentPage }]"
            @click="changePage(i)"
        >
          <a class="page-link">
            {{ i }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueTable',
    props: {
      rows: {
        required: true,
        type: Array,
        default: () => []
      },
      elementsPerPage: {
        required: true,
        type: Number,
        default: 1
      },
    },
    data() { return {
      ascending: false,
      sortColumn: '',
      currentPage: 1,
    }},
    computed: {
      columns() {
        if (this.rows.length === 0) return []
        return Object.keys(this.rows[0])
      },

      numPages() {
        return Math.ceil(this.rows.length / this.elementsPerPage)
      },

      shownRows() {
        const start = ( this.currentPage - 1 ) * this.elementsPerPage
        const end = start + this.elementsPerPage
        return this.rows.slice(start, end)
      },
    },
    methods: {
      sortTable(col) {
        if (this.sortColumn === col) {
          this.ascending = !this.ascending
        } else {
          this.ascending = true
          this.sortColumn = col
        }

        // eslint-disable-next-line
        this.rows.sort((a, b) => {
          if (a[col] > b[col]) {
            return this.ascending ? 1 : -1
          } else if (a[col] < b[col]) {
            return this.ascending ? -1 : 1
          }
          return 0
        })
      },

      changePage(page) {
        this.currentPage = page
      }
    },
    watch: {
      rows() {
        this.currentPage = 1
      }
    }
  }
</script>

<style scoped>
  .table-header,
  .page-item {
    cursor: pointer;
  }
</style>
