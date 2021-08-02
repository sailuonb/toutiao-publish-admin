import Vue from 'vue'
import VueRouter from 'vue-router'
// 在vuecli创建的项目中，@表示src目录   是src目录的别名  不受当前目录影响
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Publish from '@/views/publish/index.vue'
import Image from '@/views/image/index.vue'
import Comment from '@/views/comment/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/',
  // name: 'layout',
  component: Layout,
  children: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: 'article',
      name: 'article',
      component: Article
    },
    {
      path: 'publish',
      name: 'publish',
      component: Publish
    },
    {
      path: 'images',
      name: 'images',
      component: Image
    },
    {
      path: 'comment',
      name: 'comment',
      component: Comment
    },
    {
      name: 'setting',
      path: 'setting',
      component: Setting
    },
    {
      name: 'fans',
      path: 'fans',
      component: Fans
    }
  ]
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('user')
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
