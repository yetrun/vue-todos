import Vue from 'vue'
import { Model } from 'ar-front'

export default Model.config({
  defineAttributesIn: 'object',
  setter (key, value) {
    Vue.set(this, key, value)
  },
  deleter (key) {
    Vue.delete(this, key)
  }
})
