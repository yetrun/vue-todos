import axios from 'axios'
import Model from './model'

const Todo = Model.extend({
  attributes: {
    id: { type: Number },
    description: { type: String },
    completed: { type: Boolean, default: false }
  },
  actions: {
    async save () {
      if (this.id) {
        const { data } = await axios.put(`http://localhost:3000/todos/${this.id}`, this.attributes)
        this.attributes = data
      } else {
        const attributes = this.attributes
        delete attributes.id
        const { data } = await axios.post('http://localhost:3000/todos', attributes)
        this.attributes = data
      }
    },
    async destroy () {
      await axios.delete(`http://localhost:3000/todos/${this.id}`)
    }
  },
  static: {
    async list () {
      const { data } = await axios.get('http://localhost:3000/todos')
      return data.map(item => new Todo(item))
    }
  }
})

export default Todo
