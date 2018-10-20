Vue.component("todo-item", {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

var app = new Vue({
  el: '#app',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetable' },
      { id: 1, text: 'Apple' },
      { id: 2, text: 'Peach' }
    ]
  },
});