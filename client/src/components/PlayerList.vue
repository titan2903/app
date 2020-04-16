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
            <tr>
              <td>Padul</td>
              <td>
                <i>
                  {{ getResult ? 'Done' : 'Ongoing Battle' }}
                </i>
              </td>
              <td>{{ getScore }}</td>
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
