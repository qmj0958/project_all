import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'   //导入elementplus
import 'element-plus/dist/index.css'  //导入elementplus

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)//导入elementplus
app.mount('#app')
