
export const arrayToTree = (arr, parentId = 0, key) => {
  if (!Array.isArray(arr) || !arr.length) return [];
  let newArr = []
  arr.forEach(item => {
    // 判断 当前item.pid 和 传入的pid 是否相等，相等就push 进去
    if (item.parentId == parentId) {
      newArr.push({
        ...item, children: arrayToTree(arr, item[key], key)
      })
    }
  })
  return newArr
}

export const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return
  }
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 使用24小时制
  }).format(new Date(timestamp));
}

export const formatTimestampYMD = (timestamp) => {
   if (!timestamp) {
    return
  }
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(timestamp));
}

// 示例

class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, handler) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push({ handler, once: false })
  }

  once(event, handler) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push({ handler, once: true })
  }

  off(event, handler) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter(h => h.handler !== handler)
  }

  emit(event, ...args) {
    if (!this.events[event]) return

    this.events[event].forEach((listener, index) => {
      listener.handler(...args)
      if (listener.once) {
        this.events[event].splice(index, 1)
      }
    })
  }

  clear(event) {
    if (event) {
      delete this.events[event]
    } else {
      this.events = {}
    }
  }
}

const eventBus = new EventBus()
export { eventBus }