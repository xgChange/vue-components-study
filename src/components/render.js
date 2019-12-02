export default {
  functional: true,
  props: {
    render: Function
  },
  data() {},
  render: (h, ctx) => {
    return ctx.props.render(h)
  }
}
