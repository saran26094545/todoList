<template>
    <div class="todo-item" v-if="todo">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle-complete', todo.id)"
      />
      
      <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      <div class="button-container">
      <button class="edit-button" @click="editTodo">Edit</button>
      <button class="delete-button" @click="$emit('delete-todo', todo.id)">Delete</button>
    </div>
      <Modal v-if="editing" @close="editing = false">
      <h3>Edit Todo</h3>
      <input class="styled-input" v-model="newTitle" @keyup.enter="submitEdit" />
      <button class="save-button" @click="submitEdit">Save</button>
    </Modal>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { Todo } from '../types'
  import Modal from "../components/Modal.vue"
  
  export default defineComponent({
  components: {
    Modal
  },
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },
  emits: ['toggle-complete', 'update-todo', 'delete-todo'],
  setup(props, { emit }) {
    const editing = ref(false)
    const newTitle = ref(props.todo.title)

    const editTodo = () => {
      editing.value = true
    }

    const submitEdit = () => {
      if (newTitle.value.trim()) {
        emit('update-todo', props.todo.id, newTitle.value)
      }
      editing.value = false
    }

    return {
      editing,
      newTitle,
      editTodo,
      submitEdit
    }
  }
})
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

span.completed {
  text-decoration: line-through;
  color: #888;
}

.button-container {
  display: flex;
  margin-left: auto;
}

button {
  border: none;
  margin-left: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 60px;
  cursor: pointer;
}

.edit-button {
  background-color: #52a06c;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.save-button{
    background-color: #52a06c;
  color: white;
}

.styled-input {
  width: 75%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.styled-input:focus {
  border-color: #52a06c;
  outline: none;
  box-shadow: 0 0 5px rgba(82, 160, 108, 0.5);
}
</style>