const $handlerMap = Symbol.for('@quiver.config.handlerMap')

export const getGlobal = function() {
  if(!this.global) {
    this.global = new Map()
  }

  return this.global
}

export const getHandlerMap = function() {
  const global = this::getGlobal()
  if(!global.has($handlerMap)) {
    global.set($handlerMap, new Map())
  }

  return global.get($handlerMap)
}
