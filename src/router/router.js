const Index = () => import("../views/index")
const Form = () => import("../views/component/form")
const Checkbox = () => import("../views/component/checkbox")
const Display = () => import("../views/component/display")
export default [
  {
    path: "/",
    redirect: "/index"
  },
  {
    name: "index",
    path: "/index",
    component: Index,
    children: [
      {
        name: "component_form",
        path: "component_form",
        component: Form
      },
      {
        name: "component_checkbox",
        path: "component_checkbox",
        component: Checkbox
      },
      {
        name: "component_display",
        path: "component_display",
        component: Display
      }
    ]
  }
]
