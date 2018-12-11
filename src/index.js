import services from 'quamm-client-javascript'

export default {
  install (Vue) {
    Vue.prototype.$quammServices = services
  }
}
