<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card
        :elevation="hover ? 5 : 1"
        class="mx-auto"
        width="192"
        height="262"
        flat=""
      >
        <v-img :src="image" height="192" width="192" class="align-end">
          <v-card-actions v-show="true">
            <v-spacer></v-spacer>
            <v-btn icon="" fab="" large=""
              ><v-icon class="display-2">mdi-play-circle</v-icon></v-btn
            >
          </v-card-actions>
        </v-img>
        <v-card-text class="pb-0 text--primary d-inline-block text-truncate">
          {{ title }}
        </v-card-text>
        <v-card-subtitle
          style="max-width: 192px;"
          class="pt-0 d-inline-block text-truncate"
          >{{ subtitle }}</v-card-subtitle
        >
      </v-card>
    </template>
  </v-hover>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    image: {
      type: String
      // default: '/jacket1.jpg'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
})
</script>
