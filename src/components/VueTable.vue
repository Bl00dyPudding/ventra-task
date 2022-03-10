<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col"
          @click="sortTable(col)"
        >
          {{ col }}
          <i
            v-if="col === sortColumn"
            :class="['bi', {'bi-arrow-up': ascending}, {'bi-arrow-down': !ascending}]"
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

    <ul class="pagination">
      <li
        v-for="i in numPages"
        :key="i"
        :class="['page-item', { 'active': i === currentPage }]"
        @click="change_page(i)"
      >
        <a class="page-link">
          {{ i }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'VueTable',
    data() { return {
      ascending: false,
      sortColumn: '',
      currentPage: 1,
      elementsPerPage: 1,
      rows: [
        {id: 1, name: 'hello21', rand: 'fffffff'},
        {id: 2, name: 'hello2', rand: 'ffffffdsfdfsdff'}
      ]
    }},
    computed: {
      columns() {
        if (this.rows.length === 0) return []
        return Object.keys(this.rows[0])
      },
      numPages() {
        return Math.ceil(this.rows.length / this.elementsPerPage);
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

        this.rows.sort((a, b) => {
          if (a[col] > b[col]) {
            return this.ascending ? 1 : -1
          } else if (a[col] < b[col]) {
            return this.ascending ? -1 : 1
          }
          return 0
        })
      },
      change_page(page) {
        this.currentPage = page;
      }
    },
  }
</script>

<style scoped>
  th {
    cursor: pointer;
  }
</style>
