<template>
  <div>
    <b-field label="Username">
      <b-input v-model="getUsername" placeholder="Masukkan disini ..." min="5" maxlength="10">
      </b-input>
    </b-field>
    <div class="buttons">
      <b-button @click="gotoPlay" type="is-info" expanded>
        Masuk!
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUsername: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.dispatch('setUsername', value);
      },
    },
  },
  methods: {
    gotoPlay() {
      let uname = this.$store.state.username;

      if (uname.length < 5) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Username harus lebih dari 5 karakter',
          position: 'is-bottom',
          type: 'is-danger',
        });
      } else {
        this.$store.dispatch('emitUser', uname);
        localStorage.setItem('username', uname);
        this.$router.push('/play');
        this.$store.dispatch('inGameState', true);
        this.$buefy.toast.open({
          message: `Welcome ${uname}!`,
          type: 'is-success',
        });
      }
    },
  },
  name: 'UsernameInput',
};
</script>
