import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 引入 Vue 变量是为了让 WebStorm 识别出全局组件，等待 WebStorm 把这个 bug 修复
const Vue = app
Vue.component('SvgIcon', SvgIcon)

app.use(router)
app.mount('#app')
