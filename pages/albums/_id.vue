<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col lg="auto" class="mr-6">
        <v-img :src="picture" width="180px" height="180px" />
      </v-col>
      <v-col>
        <p class="headline">{{ name }}</p>
        <p class="subtitle">{{ artist }}</p>
      </v-col>
    </v-row>
    <v-row>
      <song-list />
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SongList from '~/components/AlbumSongList'
export default Vue.extend({
  components: {
    SongList
  },
  computed: {
    musics() {
      return this.$store.state.music.musics
    },
    name() {
      if (typeof this.$store.state.music.album.name !== 'undefined') {
        return this.$store.state.music.album.name
      } else {
        return ''
      }
    },
    picture() {
      if (typeof this.$store.state.music.album.picture !== 'undefined') {
        return this.$store.state.music.album.picture
      } else {
        return ''
      }
    },
    artist() {
      return this.$store.state.music.album.artist
    }
  },
  created() {
    this.$store.dispatch('music/getAlbum', this.$route.params.id)
    this.$store.dispatch('music/getAlbumMusics', this.$route.params.id)
  }
})
</script>
