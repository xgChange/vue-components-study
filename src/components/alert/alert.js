import Notification from "./notification"

let messageInstance
function getMessageInstance() {
  return (messageInstance = messageInstance || Notification.newInstance())
}

function notice(obj) {
  let instance = getMessageInstance()
  let objAssign = Object.assign(
    {
      duration: 3,
      message: "这是内容"
    },
    obj
  )
  return instance.add(objAssign)
}

export default {
  info(note) {
    notice(note)
  }
}
