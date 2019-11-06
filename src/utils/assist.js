/**
 * 1. 向上找到最近的指定组件
 * 2. 向上找到所有的指定组件
 * 3. 向下找到最近的指定组件
 * 4. 向下找到所有指定的组件
 * 5. 找到指定组件的兄弟组件
 */

/**
 * 向上找到最近的指定组件
 * @param {* this的上下文} context
 * @param {* 查找的组件名} componentName
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  if (parent && (!name || name !== componentName)) {
    findComponentUpward(parent, componentName) //递归
  }
  // while (parent && (!name || name !== componentName)) {
  //   parent = parent.$parent;
  //   if (parent) {
  //     name = parent.$options.name;
  //   }
  // }
  return parent
}

/**
 * 向上找到所有的指定组件
 * @param {* this的上下文} context
 * @param {* 查找的组件名} componentName
 */
function findComponentsUpward(context, componentName) {
  let parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

/**
 * 向下找到最近的指定组件
 * @param {* this的上下文} context
 * @param {* 查找的组件名} componentName
 */
function findComponentDownward(context, componentName) {
  let childrens = context.$children

  if (childrens && childrens.length) {
    for (let i = 0; i < childrens.length; i++) {
      let name = childrens[i].$options.name
      if (name === componentName) {
        return childrens[i]
      } else {
        return findComponentDownward(childrens[i], componentName)
      }
    }
  }
  return children
}

/**
 * 向下找到所有指定的组件, 使用递归和reduce累加器
 * @param {* this的上下文} context
 * @param {* 查找的组件名} componentName
 */
function findComponentsDownward(context, componentName) {
  let childrens = context.$children

  if (childrens && childrens.length) {
    return childrens.reduce((arr, cur) => {
      if (cur.$options.name === componentName) {
        arr.push(cur)
      }
      let foundChilds = findComponentDownward(cur, componentName)
      return arr.concat(foundChilds)
    }, [])
  }
}

function findBrothersComponents(context, componentName, exceptMe = true) {
  let rs = context.$parent.$children.filter(item => {
    return (item.$options.name = componentName)
  })
  let index = rs.findIndex(item => {
    // 找到context在所有的子元素中的索引
    item._uid === context._uid
  })
  if (exceptMe) {
    rs.splice(index, 1)
  }
  return rs
}
export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents
}
