export default {
  functional: true,
  props: {
    row: Object,
    col: Object,
    index: Number
  },
  inject: ["tableRoot"],
  render: (h, ctx) => {
    return h(
      "div",
      ctx.injections.tableRoot.$scopedSlots[ctx.props.col.slot]({
        row: ctx.props.row,
        col: ctx.props.col,
        index: ctx.props.index
      })
    )
  }
}
