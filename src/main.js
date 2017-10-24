import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import BuefySelect from './BuefySelect.vue'

Vue.use(Buefy)

const App = new Vue({
  el: '#app',
  template: '<div><BuefySelect/></div>',
  components: { BuefySelect }
})

