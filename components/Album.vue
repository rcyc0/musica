<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row :align="start" :justify="start">
          <v-col md="auto">
            <v-img
              src="/LACM-14906.jpg"
              aspect-ratio="1"
              class="ml-2"
              width="255"
              height="255"
              alt="No Image"
            />
          </v-col>
          <v-col>
            <p class="headline text--primary">
              THE IDOLM@STER SHINY COLORS FUTURITY SMILE
            </p>
            <p>シャイニーカラーズ</p>
            <p>2019 2曲</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col cols="12">
        <v-card>
          <v-list>
            <template v-for="(item, index) in desserts">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.index + '.' + item.title"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-spacer />
                <p class="ma-0">{{ item.time }}</p>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      desserts: [
        {
          title: 'FUTURITY SMILE',
          time: '3:12',
          artist: 'シャイニーカラーズ',
          index: 1
        },
        { divider: true, inset: true },
        {
          title: 'Spread the Wings!! -19 colors-',
          time: '4:12',
          artist: 'シャイニーカラーズ',
          index: 2
        }
      ]
    }
  }
})
</script>
