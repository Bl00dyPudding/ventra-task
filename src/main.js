import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'

Vue.use(Donut)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
