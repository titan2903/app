import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultState = () => {
  return {
    isIngame: false,
    victory: false,
    words: ['hello', 'my', 'name', 'is', 'padul'],
    input: [],
    unameSockets: [], // mungkin nanti bisa ditaro di array ini buat username lebih (v-for di papan pembuktian?)
    textModel: '',
    username: '',
    score: 0,
  };
};

const state = defaultState();

const store = new Vuex.Store({
  state,
  mutations: {
    RESET_STATE(state) {
      Object.assign(state, defaultState());
    },
    SET_INGAMESTATE(state, payload) {
      state.isIngame = payload;
    },
    SET_INPUT(state, payload) {
      state.input.push(payload);
    },
    SET_TEXTMODEL(state, payload) {
      state.textModel = payload;
    },
    SET_VICTORY(state, payload) {
      state.victory = payload;
    },
    SET_SCORE(state, payload) {
      state.score = payload;
    },
    SET_UNAME(state, payload) {
      state.username = payload;
    },
  },
  actions: {
    resetState({ commit }) {
      commit('RESET_STATE');
    },
    setUsername({ commit }, str) {
      commit('SET_UNAME', str);
    },
    inGameState({ commit }, bool) {
      commit('SET_INGAMESTATE', bool);
    },
    inputWords({ commit }, text) {
      commit('SET_TEXTMODEL', text);
    },
    setWinner({ commit }, bool) {
      commit('SET_VICTORY', bool);
    },
    addWords({ state, commit }) {
      const text = state.textModel;
      commit('SET_INPUT', text.substring(0, text.length - 1));
    },
    calculateScore({ state, commit }) {
      let correct = 0;
      let inputted = state.input;
      let words = state.words;

      for (let i = 0; i < words.length; i++) {
        for (let j = i; j < inputted.length; j++) {
          if (words[i] == inputted[j]) {
            correct += 1;
          }
          break;
        }
      }
      commit('SET_SCORE', correct);
      commit('SET_VICTORY', true);
    },
  },
});

export default store;
