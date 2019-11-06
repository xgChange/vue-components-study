const Index = () => import('../views/index')
const Form = () => import('../views/component/form')

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    name: 'index',
    path: '/index',
    component: Index,
    children: [
      {
        name: 'component-form',
        path: 'component_form',
        component: Form
      }
    ]
  }
]
