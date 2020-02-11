import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.config.productionTip =false
Vue.use(VueRouter)
Vue.use(ViewUI)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/BlogText/:id',
    name: 'BlogText',
    component: () => import( '../components/BlogText.vue'),
    props:true,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
