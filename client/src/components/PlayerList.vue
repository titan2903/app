<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <b>
          Papan Pembuktian
        </b>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Result</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in getUsers" :key="user">
              <td>{{ user.name }}</td>
              <td>
                <i>
                  {{ getResult ? 'Done' : 'Ongoing Battle' }}
                </i>
              </td>
              <td>{{ user.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
  computed: {
    getUsers() {
      return this.$store.state.users;
    },
    getScore() {
      return this.$store.state.score;
    },
    getResult() {
      return this.$store.state.victory;
    },
    getTextModel() {
      return this.$store.state.textModel;
    },
  },
};
</script>
