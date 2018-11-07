<template>
	<div class="container">
		<h2>Homepage</h2>
		<item v-for="story in getTopStories" :key="story.id" :story="story"></item>
	</div>
</template>

<script>
  import axios from 'axios'
  import Item from './Item'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Homepage',
    data: function () {
      return {
        err: '',
//        stories: this.getTopStories()
      }
    },
    components: {
		Item
    },
    methods: {
      ...mapActions([
        'fetch_top_stories',
        'update_top_stories'
      ])
    },
    computed: {
      ...mapGetters([
        'getTopStories',
      ])
    },
    created: function () {
      this.fetch_top_stories()
      setInterval(() => this.update_top_stories(), 10000);
    }
  }
</script>

<style scoped>

</style>