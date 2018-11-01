import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let STORAGE_KEY = 'todos-vuejs-2.0';

export default new Vuex.Store({
  state: {
    todos: [],
    uid: 0,
    newTodo: '',
    beforeEditCache: '',
    editedTodo: '',
    todoKind: 'all'
  },


  getters: {
    getTodos: state => state.todos,
    getUid: state => state.uid,
    getNewTodo: state => state.newTodo,
    getBeforeEditCache: state => state.beforeEditCache,
    getEditedTodo: state => state.editedTodo,
    getRemaining: state => state.todos.filter(todo => todo.completed == false).length,
    getTodoCompleted: state => goal => state.todos.forEach(function (todo) {
      if (todo == goal)
        return todo.completed
    }),
    getFiltedTodo: state => {
      if (state.todoKind == 'all')
        return state.todos
      else if (state.todoKind == 'completed')
        return state.todos.filter(todo => todo.completed == true)
      else if (state.todoKind == 'active')
        return state.todos.filter(todo => todo.completed == false)
      else
        return []
    },
    getTodoKind: state => state.todoKind
  },

  mutations: {
    FETCH: (state) => {
      let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      todos.forEach(function (todo, index) {
        todo.id = index
      });
      state.uid = todos.length;
      state.todos = todos
    },

    SAVE: (state) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos))
      state.newTodo = null
    },

    ADDTODO: (state, title) => {
      state.newTodo = title
      let value = state.newTodo && state.newTodo.trim();
      if (!value) {
        return
      }
      state.todos.push({
        id: state.uid++,
        title: title,
        completed: false
      });
      state.newTodo = ''
    },

    REMOVETODO: (state, todo) => {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },

    EDITTODO: (state, todo) => {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo
    },

    DONEEDIT: (state, todo) => {
      if (!state.editedTodo) {
        return
      }
      state.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        state.removeTodo(todo)
      }
    },

    CANCELEDIT: (state, todo) => {
      state.editedTodo = null;
      todo.title = state.beforeEditCache
    },

    REMOVECOMPLETED: (state) => {
      state.todos = state.todos.filter(todo => todo.completed == false)
    },

    SETALL: (state, value) => {
      state.todos.forEach(todo => todo.completed = value)
    },

    SETTODOCOMPLETED: (state, obj) => {
      state.todos.forEach(todo => {
        if (obj.todo == todo) {
          todo.completed = obj.value
        }
      })
    },

    SETTODOKIND: (state, kind) => {
      state.todoKind = kind
    }
  },

  actions: {
    removeTodo: (context, todo) => {
      context.commit('REMOVETODO', todo)
      context.commit('SAVE')
    },

    addTodo: (context, title) => {
      context.commit('ADDTODO', title)
      context.commit('SAVE')
    },

    initTodo: (context) => {
      context.commit('FETCH')
    },

    save: (context) => {
      context.commit('SAVE')
    },

    editTodo: (context, todo) => {
      context.commit('EDITTODO', todo)
    },

    doneEdit: (context, todo) => {
      context.commit('DONEEDIT', todo)
      context.commit('SAVE')
    },

    cancelEdit: (context, todo) => {
      context.commit('CANCELEDIT', todo)
    },

    removeCompleted: (context) => {
      context.commit('REMOVECOMPLETED')
      context.commit('SAVE')
    },

    setAll: (context, value) => {
      context.commit('SETALL', value)
    },

    setTodoCompleted: (context, obj) => {
      context.commit('SETTODOCOMPLETED', obj)
      context.commit('SAVE')
    },

    setTodoKind: (context, kind) => {
      context.commit('SETTODOKIND', kind)
    }
  }
})
