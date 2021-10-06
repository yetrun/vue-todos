<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <form class="col-12 col-sm-10 col-md-8 cl-lg-6" @submit.prevent="addTodo()">
        <input
          v-model="newTodo.description"
          type="text"
          class="form-control"
          placeholder="Create a new to-do..."
        />
      </form>
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo-item
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
import TodoItem from "./Todo.vue";
import { Todo } from '../models'

export default {
  props: {
    listName: String,
  },
  components: { 
    TodoItem
  },
  data() {
    return {
      newTodo: new Todo(),
      todos: [
        { description: "Do the dishes", completed: false },
        { description: "Take out the trash", completed: false },
        { description: "Finish doing laundry", completed: false },
      ],
    };
  },
  async mounted () {
    this.todos = await Todo.list()
  },
  methods: {
    async addTodo() {
      await this.newTodo.save()
      this.todos.push(this.newTodo)

      this.newTodo = new Todo()
    },
    async toggleTodo(todo) {
      todo.completed = !todo.completed;
      await todo.save()
    },
    async deleteTodo(deletedTodo) {
      await deletedTodo.destroy()
      this.todos = this.todos.filter(todo => todo !== deletedTodo)
    },
    async editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
      await todo.save()
    }
  }
};
</script>

<style scoped lang="scss"></style>
