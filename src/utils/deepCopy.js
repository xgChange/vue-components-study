function deepCopy(source) {
  const target = source.constructor === Array ? [] : {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === "object") {
        target[key] = source[key].constructor === Array ? [] : {}
        target[key] = deepCopy(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

export default deepCopy
