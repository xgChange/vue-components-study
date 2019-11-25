export default {
  functional: true,
  props: {
    render: Function
  },
  data() {},
  render: (h, ctx) => {
    console.log(ctx)
    return ctx.props.render(h)
  }
}
