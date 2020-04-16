<template>
  <div>
    <b-field label="Username">
      <b-input placeholder="Masukkan disini ..." min="5" maxlength="10"> </b-input>
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
  methods: {
    gotoPlay() {
      this.$router.push('/play');
      this.$store.dispatch('inGameState', true);
    },
  },
  name: 'UsernameInput',
};
</script>
