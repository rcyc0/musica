<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <music-list v-if="active_tab === 0" />
      <albums v-if="active_tab === 1" />
      <artists v-if="active_tab === 2" />
    </v-row>
  </v-container>
</template>

<script>
// import Album from '~/components/Album.vue'
// import Artist from '~/components/Artist.vue'
// import Artist from '~/components/Jacket.vue'
import MusicList from '~/components/AlbumSongList.vue'
// import Artist from '~/components/MusicPlayer.vue'
import Albums from '~/components/Albums.vue'
import Artists from '~/components/Artists.vue'

export default {
  components: {
    Artists,
    Albums,
    MusicList
  },
  data: () => ({
    tabs: [
      { id: 1, name: '曲' },
      { id: 2, name: 'アルバム' },
      { id: 3, name: 'アーティスト' },
      { id: 4, name: 'プレイリスト' },
      { id: 5, name: 'ジャンル' }
    ]
  }),
  computed: {
    active_tab() {
      return this.$store.state.active_tab
    }
  }
}
</script>
