<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               autofocus autocomplete="off"
               placeholder="What needs to be done?"
               v-bind:value="getNewTodo"
               @keyup.enter="addTodo($event.target.value)">
      </header>
      <router-view></router-view>
      <footer class="footer" v-show="getTodos.length" v-cloak>
		<span class="todo-count">
			  <strong>{{ getRemaining }}</strong> {{ getRemaining | pluralize }} left
		</span>
        <ul class="filters">
          <li><router-link to="/all" :class="{ selected: getTodoKind == 'all'}">All</router-link></li>
          <li><router-link to="/active" :class="{ selected: getTodoKind == 'active'}">Active</router-link></li>
          <li><router-link to="/completed" :class="{ selected: getTodoKind == 'completed'}">Completed</router-link></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="getTodos.length > getRemaining">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    components: {
    },
    methods: {
      ...mapActions([
        'addTodo',
        'initTodo',
        'removeCompleted',
      ])
    },
    computed: {
      ...mapGetters([
        'getTodos',
        'getNewTodo',
        'getRemaining',
        'getTodoKind'
      ]),
    },
    created: function () {
      this.initTodo();
    },

    filters: {
      pluralize: function (n) {
        return n == 1 ? 'item' : 'items'
      }
    },
  }
</script>

<style lang="scss">
@import url("https://unpkg.com/todomvc-app-css@2.0.4/index.css");
[v-cloak] { display: none;}
</style>
