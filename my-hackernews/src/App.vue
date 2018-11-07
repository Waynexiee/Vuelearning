<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/NavBar'
  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>
  @import "https://unpkg.com/purecss@1.0.0/build/pure-min.css";
</style>