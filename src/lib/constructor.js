import { fluentConstructor } from 'quiver-util/object'

export const implComponentConstructor = (Component, method, wrapper) => {
  return (implFn, options={}) => {
    const component = new Component(options)
    const wrapped = wrapper(implFn)

    component[method] = () => wrapped
    component.implFunc = implFn

    return component.activate()
  }
}

export const fluentComponentConstructor = (Component, method, wrapper, fields) => {
  const componentConstructor = implComponentConstructor(Component, method, wrapper)
  const createFluentProxy = fluentConstructor(fields)

  return (implFn, options) =>
    createFluentProxy(
      options =>
        componentConstructor(implFn, options),
      options)
}
