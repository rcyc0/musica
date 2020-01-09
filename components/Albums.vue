<template>
  <v-container>
    <v-row>
      <div v-for="album in albums" :key="album.id" class="ma-2">
        <jacket
          :image="album.picture"
          :title="album.name"
          :subtitle="album.artist"
        />
      </div>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Jacket from '~/components/Jacket.vue'

export default Vue.extend({
  components: {
    Jacket
  },
  computed: {
    albums() {
      return this.$store.state.music.albums
    }
  },
  created() {
    this.$store.dispatch('music/getAlbums')
  }
})
</script>
