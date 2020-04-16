<template>
  <router-link v-if="!showNav" to="/">Masuk</router-link>
  <div v-else>
    <router-link to="/play">Play</router-link> |
    <a @click="logout">Change User</a>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
      this.$store.dispatch('inGameState', false);
    },
  },
  computed: {
    isIngame() {
      return this.$store.state.isIngame;
    },
  },
  watch: {
    isIngame(newVal) {
      if (newVal) {
        this.showNav = true;
      } else {
        this.showNav = false;
      }
    },
  },
};
</script>
