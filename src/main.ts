import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'


//引入初始化样式
import './assets/style/index.scss'

//引入icon-JS
import './assets/font/fonts/iconfont.js'

//引入全局组件
import globalComponents from './components/globalComponents'

//引入路由
import router from './router'

//引入全局状态
const pinia = createPinia();

//创建vue实例
const app = createApp(App);




app.use(globalComponents).use(router).use(pinia);
app.mount('#app')
