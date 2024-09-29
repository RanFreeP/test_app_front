import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//import axios from 'axios'



// createApp({
//     axios,
//     router,
//     store,
//     render: h => h(App)
// }).mount('#app')

const app = createApp(App)
app.use(router)
//app.use(axios)
app.use(store)
app.mount('#app')