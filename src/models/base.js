import Vue from 'vue'
import { Model as ModelFactory, Collection as CollectionFactory } from 'ar-front'

const Model = ModelFactory.config({
  defineAttributesIn: 'object',
  setter (key, value) {
    Vue.set(this, key, value)
  },
  deleter (key) {
    Vue.delete(this, key)
  }
})

const Collection = CollectionFactory.config({
  deleter (index) {
    Vue.delete(this, index)
  }
})

export { Model, Collection }
