<template>
  <div class="pa-8">
    <v-row>
      <v-avatar height="146" width="146">
        <img :src="image" />
      </v-avatar>
    </v-row>
    <v-row>
      <p style="max-width: 146px;" class="d-inline-block text-truncate">
        {{ name }}
      </p>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    image: {
      type: String
    },
    name: {
      type: String,
      default: ''
    }
  }
})
</script>
