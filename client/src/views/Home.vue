<template>
  <div>
    <section class="hero is-bold is-light is-fullheight">
      <div class="hero-body bg-kibor">
        <div class="container has-background-white" style="padding: 2%; margin: auto 10%;">
          <h1 class="title">
            Hello!
          </h1>
          <h1 class="subtitle">
            Silahkan masukan username anda!
          </h1>
          <UsernameInput id="new-player" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UsernameInput from '@/components/UsernameInput.vue';

export default {
  name: 'Home',
  created() {
    this.$store.dispatch('getWords');
  },
  components: {
    UsernameInput,
  },
};
</script>

<style scoped>
#new-player {
  margin: 0 25%;
}
.bg-kibor {
  background: url('../assets/logo.jpeg');
}
</style>
