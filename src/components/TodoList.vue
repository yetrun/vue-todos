<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="todo in todos"
            :key="todo.id"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Todo from "./Todo.vue";
import CreateTodo from "./CreateTodo.vue";

export default {
  props: {
    listName: String,
  },
  data() {
    return {
      todos: [
        { description: "Do the dishes", completed: false },
        { description: "Take out the trash", completed: false },
        { description: "Finish doing laundry", completed: false },
      ],
    };
  },
  async mounted () {
    const { data } = await axios.get('http://localhost:3000/todos')
    this.todos = data
  },
  methods: {
    async addTodo(newTodo) {
      const { data } = await axios.post('http://localhost:3000/todos', { 
        description: newTodo, completed: false 
      })
      this.todos.push(data)
    },
    async toggleTodo(todo) {
      todo.completed = !todo.completed;
      await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
    },
    async deleteTodo(deletedTodo) {
      await axios.delete(`http://localhost:3000/todos/${deletedTodo.id}`)
      this.todos = this.todos.filter(todo => todo !== deletedTodo)
    },
    async editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
      await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
    }
  },
  components: { Todo, CreateTodo },
};
</script>

<style scoped lang="scss"></style>
