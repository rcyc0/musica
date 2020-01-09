<template>
  <v-container>
    <v-row>
      <v-data-table :headers="headers" :items="musics" class="elevation-1">
        <template v-slot:header.time="{ header }">
          <div>
            <v-icon>{{ header.text }}</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    headers: [
      {
        text: '番号',
        value: 'track'
      },
      { text: 'タイトル', value: 'title' },
      { text: 'mdi-clock-outline', value: 'time' }
    ]
  }),
  computed: {
    musics() {
      return this.$store.state.music.playList
    }
  }
})
</script>
