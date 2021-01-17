window.Controller = function (options) {
  let originInit = options.init
  options.view = null
  options.model = null
  options.init = function (view, model) {
    this.view = view
    this.model = model
    this.model && this.model.init()
    originInit && originInit.call(this, view, model)
    this.bindEvents && this.bindEvents()
  }
  return options
}