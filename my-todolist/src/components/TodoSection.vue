<template>
	<section class="main" v-show="getFiltedTodo.length" v-cloak>
		<input class="toggle-all" type="checkbox" v-model="allDone">
		<ul class="todo-list">
			<li v-for="todo in getFiltedTodo"
			    class="todo"
			    :key="todo.id"
			    :class="{ completed: todo.completed, editing: todo == getEditedTodo }">
				<div class="view">
					<input class="toggle" type="checkbox" :checked="todo.completed" @click="setTodoCompleted({
                todo: todo,
                value: $event.target.checked
              })">
					<label @dblclick="editTodo(todo)">{{ todo.title }}</label>
					<button class="destroy" @click="removeTodo(todo)"></button>
				</div>
				<input class="edit" type="text"
				       v-model="todo.title"
				       v-todo-focus="todo == getEditedTodo"
				       @blur="doneEdit(todo)"
				       @keyup.enter="doneEdit(todo)"
				       @keyup.esc="cancelEdit(todo)">
			</li>
		</ul>
	</section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    components: {
    },
    methods: {
      ...mapActions([
        'removeTodo',
        'addTodo',
        'initTodo',
        'editTodo',
        'doneEdit',
        'cancelEdit',
        'removeCompleted',
        'setAll',
        'setTodoCompleted',
        'setTodoKind'
      ])
    },
    computed: {
      ...mapGetters([
        'getTodos',
        'getUid',
        'getNewTodo',
        'getBeforeEditCache',
        'getEditedTodo',
        'getRemaining',
        'getTodoCompleted',
        'getFiltedTodo',
      ]),
      allDone: {
        get: function () {
          return this.getRemaining === 0
        },
        set: function (value) {
          this.setAll(value)
        }
      }
    },

    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    },

    filters: {
      pluralize: function (n) {
        return n == 1 ? 'item' : 'items'
      }
    },

    watch: {
      '$route' (to, from) {
        this.setTodoKind(to.params.completed)
      }
    }
  }
</script>

<style lang="scss">
	@import url("https://unpkg.com/todomvc-app-css@2.0.4/index.css");
	[v-cloak] { display: none;}
</style>