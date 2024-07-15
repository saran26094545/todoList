<script setup lang="ts">
import { RouterView } from 'vue-router'
import TodoList from './components/TodoList.vue'
import { useTodoStore } from './stores/todo'
import { onMounted } from 'vue'


const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="app">
    <header>
      <h1>Todo List App</h1>
    </header>

    <main>
      <TodoList />
    </main>

    <RouterView />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  font-size: 50px;
}

main {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>