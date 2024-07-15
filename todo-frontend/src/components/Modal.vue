<template>
    <div class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <slot></slot>
        <button class="close-button" @click="close">Close</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    emits: ['close'],
    setup(_, { emit }) {
      const close = () => {
        emit('close')
      }
  
      return {
        close
      }
    }
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    min-width: 300px;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 2px 10px;
    cursor: pointer;
  }
  
  h3 {
    margin-top: 0;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #c51b1b;
    border-radius: 4px;
    background-color: #e74c3c;
  }
  
  button {
    padding: 10px 15px;
    background-color: #52a06c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  

  </style>
  