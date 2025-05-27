// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// import VueGridLayout from 'vue-grid-layout'

// createApp(App).use(VueGridLayout).mount('#app')
// // createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import GridLayout from 'vue3-grid-layout'

const app = createApp(App)
app.component('GridLayout', GridLayout.GridLayout)
app.component('GridItem', GridLayout.GridItem)
app.mount('#app')