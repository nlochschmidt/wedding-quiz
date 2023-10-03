import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { WeddingQuiz } from './store'
import { createVuexStore } from 'vuex-simple'

Vue.config.productionTip = false

Vue.directive('visible', (el: any, bind: any) => {
  el.style.visibility = (bind.value) ? 'visible' : 'hidden'
})

const store = createVuexStore(new WeddingQuiz())
store.dispatch(`loadInitialState`)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
