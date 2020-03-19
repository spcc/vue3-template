const _import = require('./_import')
import Home from '../views/home/'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: _import('about')
  },
  {
    path: '/about1',
    name: 'about1',
    component: _import('about1')
  }
]
export default [
  ...routes
]