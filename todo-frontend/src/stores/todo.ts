import { defineStore } from 'pinia'
import axios from 'axios'
import type { Todo } from "../types"

const API_URL = 'http://localhost:3000/api/todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[]
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(API_URL)
        this.todos = response.data
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },
    async addTodo(title: string) {
      try {
        const response = await axios.post(API_URL, { title, completed: false })
        this.todos.push(response.data)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async toggleComplete(id: number) {
      try {
        const todo = this.todos.find(t => t.id === id)
        if (todo) {
          const response = await axios.put(`${API_URL}/${id}`, {
            ...todo,
            completed: !todo.completed
          })
          Object.assign(todo, response.data)
        }
      } catch (error) {
        console.error('Error toggling todo:', error)
      }
    },
    async deleteTodo(id: number) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    },
    async updatetodo(id: number, title: string) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, { title, completed: false })
        const updatedTodo = response.data
    
        // Update the local todos array with the updated todo item
        const index = this.todos.findIndex(todo => todo.id === id)
        if (index !== -1) {
          this.todos.splice(index, 1, updatedTodo)
        }
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    }    
  }
})