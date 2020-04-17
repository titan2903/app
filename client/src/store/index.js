import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

Vue.use(Vuex);

const defaultState = () => {
  return {
    users: [],
    isIngame: false,
    victory: false,
    words: [],
    input: [],
    unameSockets: [], // mungkin nanti bisa ditaro di array ini buat username lebih (v-for di papan pembuktian?)
    textModel: '',
    username: '',
    score: 0,
  };
};

const state = defaultState();
const uri = 'http://localhost:3000/getData';

const store = new Vuex.Store({
  state,
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
    },
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
    SET_WORDS(state, payload) {
      state.words = payload;
    },
  },
  actions: {
    newPlayer({ commit }) {
      socket.on('pemain', (users) => {
        commit('SET_USERS', users);
      });
    },
    emitUser(_, payload) {
      socket.emit('emitUser', payload);
    },
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
    getWords({ commit }) {
      fetch(uri, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const sliced = data.words.slice(0, 15);

          for (let i = sliced.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            let temp = sliced[i];
            sliced[i] = sliced[j];
            sliced[j] = temp;
          }

          commit('SET_WORDS', sliced);
        });
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
      socket.emit('total_score', { name: localStorage.getItem('username'), score: correct });
      commit('SET_SCORE', correct);
      commit('SET_VICTORY', true);
    },
  },
});

export default store;
