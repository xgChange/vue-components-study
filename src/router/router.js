const Index = () => import("../views/index")
const Form = () => import("../views/component/form")
const Checkbox = () => import("../views/component/checkbox")
const Display = () => import("../views/component/display")
const Alert = () => import("../views/component/alert")
const Table = () => import("../views/component/table")
const TableSlot = () => import("../views/component/table-slot")

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
      },
      {
        name: "component_alert",
        path: "component_alert",
        component: Alert
      },
      {
        name: "component_table",
        path: "component_table",
        component: Table
      },
      {
        name: "component_table-slot",
        path: "component_table-slot",
        component: TableSlot
      }
    ]
  }
]
