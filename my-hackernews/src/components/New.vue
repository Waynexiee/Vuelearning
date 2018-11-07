<template>
	<div class="container">
		<item v-for="story in getNewStories" :key="story.id" :story="story"></item>
	</div>
</template>

<script>
  import axios from 'axios'
  import Item from './Item'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'New',
    components: {
      Item
    },
    data: function () {
      return {
        err: '',
      }
    },
    methods: {
      ...mapActions([
        'fetch_new_stories',
        'update_new_stories'
      ])
    },
    computed: {
      ...mapGetters([
        'getNewStories',
      ])
    },
    created: function () {
      this.fetch_new_stories();
    }
  }
</script>