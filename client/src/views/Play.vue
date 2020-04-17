<template>
  <div>
    <section class="hero is-bold is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          <PlayerList />
        </div>
        <div class="container" id="game">
          <b-modal :active.sync="showModal">
            <div v-if="getScore != getInputLength">
              <h1 class="title has-text-danger">NOO! YOU'RE WRONGGG! SCORE: {{ getScore }}</h1>
              <img src="../assets/lose.gif" />
            </div>
            <div v-else>
              <h1 class="title has-text-warning">YEAYYY!! YOU'RE CORRECT! SCORE: {{ getScore }}</h1>
              <img src="../assets/win.gif" />
            </div>
          </b-modal>

          <h1 class="title">
            Type this words
          </h1>
          <h1 class="subtitle">
            As fast as you can
          </h1>
          <div v-if="showStart" class="buttons">
            <b-button
              @click="startTimer"
              type="is-success is-large"
              expanded
              :disabled="battleDone"
            >
              Start Game!
            </b-button>
          </div>
          <div v-else>
            <h1 class="subtitle">Waktu: {{ timer }}s</h1>
            <b-message v-for="getWords in this.$store.state.words" :key="getWords.id"> /* loop data */
              <b>
                {{ getWords }}
              </b>
            </b-message>
            <b-message type="is-warning">
              <i>
                {{ getInput.length ? getInput.join(' ') : 'Type now!' }}
              </i>
            </b-message>
            <b-field label="Type here : " custom-class="has-text-white">
              <b-input
                @keyup.space.native="contestCorrections"
                maxlength="200"
                type="textarea"
                :disabled="battleDone"
                v-model="contest"
              >
              </b-input>
            </b-field>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';
import io from 'socket.io-client';

export default {
  name: 'Play',
  data() {
    return {
      socket: {},
      showStart: true,
      showModal: false,
      battleDone: false,
      timer: 30,
    };
  },
  created(){
    if('2 peserta'){
      socket.emit('created', true) // kirim data ke server
      
    }else{
      // back to halaman utama
    }
  },
  mounted(){
    socket.on('created', data =>{
        this.$dispatch('getAPI')
    })
  },
  computed: {
    getScore() {
      return this.$store.state.score;
    },
    getWinner() {
      return this.$store.state.victory;
    },
    getInput() {
      return this.$store.state.input;
    },
    getInputLength() {
      let input = this.$store.state.input;
      return input.length;
    },
    getWords() {
      let words = this.$store.state.words;
      return words.join(' ');
    },
    contest: {
      get() {
        return this.$store.state.textModel;
      },
      set(value) {
        this.$store.dispatch('inputWords', value);
      },
    },
  },
  components: {
    PlayerList,
  },
  methods: {
    startTimer() {
      this.showStart = !this.showStart;
      let countdown = setInterval(() => {
        this.timer--;
        if (this.timer < 0) {
          clearInterval(countdown);
          this.showStart = true;
          this.timer = 30;
        }
      }, 1000);
    },
    contestCorrections() {
      this.$store.dispatch('addWords');
      this.$store.dispatch('inputWords', '');
    },
  },
  watch: {
    getInputLength(newVal) {
      const wordsLength = this.$store.state.words.length;
      if (newVal == wordsLength) {
        this.$store.dispatch('calculateScore');
      } else {
        this.$store.dispatch('setWinner', false);
      }
    },
    getWinner(newVal) {
      if (newVal) {
        this.showModal = true;
        this.battleDone = true;
      } else {
        this.showModal = false;
        this.battleDone = false;
      }
    },
  },
};
</script>

<style scoped>
#game {
  margin: 0 10%;
}
</style>
