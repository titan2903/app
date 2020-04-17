<template>
  <div id="app">
    <b-navbar id="nav" type="is-light" spaced>
      <template slot="brand">
        <b-navbar-item>
          <h1 class="title">LoMbA KeTikQ</h1>
        </b-navbar-item>
      </template>
      <template slot="end" v-if="showLogout">
        <b-navbar-item tag="router-link" :to="{ path: '/play' }">
          Play
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button @click="logout" type="is-danger" expanded outlined>
              Log Out
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    showLogout: {
      get() {
        let check = this.$store.state.isIngame;
        let uname = localStorage.getItem('username');

        if (uname || check) {
          return true;
        } else {
          return false;
        }
      },
      set() {
        //
      },
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.showLogout = false;
      this.check = false;
      this.$router.push('/');
      this.$store.dispatch('resetState');
    },
  },
};
</script>
