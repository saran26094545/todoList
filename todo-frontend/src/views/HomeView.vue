<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Todo List</h1>
    <div class="mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo"
        class="w-full p-2 border rounded-md"
      />
    </div>
    <div>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import { Todo } from "../types"
import { useTodoStore } from '../stores/todo'


export default defineComponent({
  components: {
    TodoItem
  },
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref('')

    onMounted(() => {
      todoStore.fetchTodos()
    })

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value)
        newTodo.value = ''
      }
    }

    const toggleComplete = (id: number) => {
      todoStore.toggleComplete(id)
    }

    const deleteTodo = (id: number) => {
      todoStore.deleteTodo(id)
    }

    return {
      todos: todoStore.todos,
      newTodo,
      addTodo,
      toggleComplete,
      deleteTodo
    }
  }
})
</script>