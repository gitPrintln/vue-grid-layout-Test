// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// import VueGridLayout from 'vue-grid-layout'

// createApp(App).use(VueGridLayout).mount('#app')
// // createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import GridLayout from 'vue3-grid-layout'

// Vuetify 관련 추가
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.component('GridLayout', GridLayout.GridLayout)
app.component('GridItem', GridLayout.GridItem)
app.use(vuetify).mount('#app')