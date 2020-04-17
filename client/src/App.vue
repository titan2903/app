<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch('newPlayer');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: left;
}

#nav a {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: darkgoldenrod;
}
</style>
