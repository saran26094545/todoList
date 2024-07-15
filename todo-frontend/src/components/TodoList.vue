<template>
    <div>
      <h2>Todo List</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="todos.length === 0">No todos found.</div>
      <TodoItem
        v-else
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @update-todo="updatetodo"
        @delete-todo="deleteTodo"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useTodoStore } from '../stores/todo'
  import TodoItem from './TodoItem.vue'
  import { Todo } from "../types"


  export default defineComponent({
  components: {
    TodoItem
  },
  setup() {
    const todoStore = useTodoStore()
    const { todos } = storeToRefs(todoStore)
    const loading = ref(true)

    onMounted(async () => {
      await todoStore.fetchTodos()
      loading.value = false
      console.log('Todos in component:', todos.value)
    })

    const toggleComplete = (id: number) => {
      todoStore.toggleComplete(id)
    }

    const deleteTodo = (id: number) => {
      todoStore.deleteTodo(id)
    }

    const updatetodo = (id: number, title: string) => {
      todoStore.updatetodo(id, title)
    }

    return {
      todos,
      loading,
      toggleComplete,
      deleteTodo,
      updatetodo
    }
  }
})
</script>

<style scoped>
.todo-list {
  max-width: 800px;
  margin: 0 auto;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

.add-todo input {
  flex-grow: 1;
  padding: 5px;
  font-size: 16px;
}

.add-todo button {
  padding: 5px 10px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

li button {
  margin-left: auto;
}
</style>