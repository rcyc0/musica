<template>
  <v-container>
    <v-row>
      <div v-for="artist in artists" :key="artist.id" class="ma-2">
        <artist :image="artist.picture" :name="artist.name" />
      </div>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Artist from '~/components/Artist.vue'

export default Vue.extend({
  components: {
    Artist
  },
  computed: {
    artists() {
      return this.$store.state.music.artists
    }
  },
  created() {
    this.$store.dispatch('music/getArtists')
  }
})
</script>
