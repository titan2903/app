<template>
  <div>
    <div v-if="!check">
      <router-link to="/">Masuk</router-link>
    </div>
    <div v-else>
      <router-link to="/play">[ Play ]</router-link> |
      <a @click="logout">[ Change User ]</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      check: true,
    };
  },
  created() {
    this.checkData();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.check = false;
      this.$router.push('/');
      this.$store.dispatch('resetState');
    },
    checkData() {
      const state = this.$store.state.isIngame;
      const uname = localStorage.getItem('uname');

      if (state) {
        this.check = true;
      } else if (uname) {
        this.check = true;
      } else {
        this.check = false;
      }
    },
  },
};
</script>
