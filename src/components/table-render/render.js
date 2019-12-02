export default {
  functional: true,
  props: {
    col: Object,
    row: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      col: ctx.props.col,
      row: ctx.props.row,
      index: ctx.props.index
    }
    return ctx.props.render(h, params)
  }
}
