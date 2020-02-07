<template>
  <v-footer fixed padless elevation="24" app>
    <v-card flat tile width="100%">
      <v-row dense>
        <v-col md="auto" lg="auto" class="ml-1">
          <v-img
            :src="picture"
            aspect-ratio="1"
            width="90"
            height="90"
            alt="No Image"
          />
        </v-col>
        <v-col>
          <v-row dense>
            <v-slider
              v-model="percentage"
              :disabled="!loaded"
              dark
              height="1"
              dense
              color="primary"
              class="ml-0"
              max="100000"
              @click.native="setPosition()"
            ></v-slider>
          </v-row>
          <v-row justify="start">
            <v-col class="ml-8" cols="4">
              <v-row>
                <p class="subtitle-1 ma-1 mb-0">
                  {{ title }}
                </p>
              </v-row>
              <v-row>
                <p class="ma-0 caption">{{ title }} - {{ artist }}</p>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col justify-self="center" align-self="center" cols="5">
              <v-btn :color="repeatcolor" icon @click="repeat">
                <v-icon v-if="loop">mdi-repeat-once</v-icon>
                <v-icon v-else>mdi-repeat</v-icon>
              </v-btn>
              <v-btn icon color="grey darken-4" @click="previous">
                <v-icon>mdi-skip-previous</v-icon>
              </v-btn>
              <v-btn
                :disabled="!loaded"
                class="mx-2 ml-5 mr-5"
                fab
                dark
                large
                color="primary"
                @click.native="playing ? pause() : play()"
              >
                <v-icon v-if="!playing || paused" dark>mdi-play</v-icon>
                <v-icon v-else dark>mdi-pause</v-icon>
              </v-btn>
              <v-btn icon color="grey darken-4" @click="next">
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
              <v-btn icon color="grey darken-4">
                <v-icon>mdi-shuffle</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="1" align-self="center" justify-self="end">
              <v-btn icon color="grey darken-4">
                <v-icon>mdi-volume-high</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <audio
      id="player"
      ref="player"
      :src="music"
      :loop="loop"
      :autoplay="autoplay"
      @play="playPause"
      @pause="playPause"
      @ended="ended"
      @loadeddata="loadedData"
      @timeupdate="timeUpdate"
    ></audio>
  </v-footer>
</template>
<script>
const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(11, 8)
export default {
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: '00:00:00',
      audio: undefined,
      totalDuration: 0,
      loop: false,
      repeatcolor: '',
      music_id: 0,
      autoplay: false
    }
  },
  computed: {
    picture() {
      if (
        typeof this.$store.state.music.playList[this.music_id] !== 'undefined'
      ) {
        return this.$store.state.music.playList[this.music_id].picture_url
      } else {
        return ''
      }
    },
    title() {
      if (
        typeof this.$store.state.music.playList[this.music_id] !== 'undefined'
      ) {
        return this.$store.state.music.playList[this.music_id].title
      } else {
        return ''
      }
    },
    album() {
      return this.$store.state.music.playList[this.music_id].album
    },
    artist() {
      if (
        typeof this.$store.state.music.playList[this.music_id] !== 'undefined'
      ) {
        return this.$store.state.music.playList[this.music_id].artist
      } else {
        return ''
      }
    },
    music() {
      if (
        typeof this.$store.state.music.playList[this.music_id] !== 'undefined'
      ) {
        return this.$store.state.music.playList[this.music_id].file_url
      } else {
        return ''
      }
    }
  },
  created() {
    this.$store.dispatch('music/getMusics')
    this.$store.dispatch('music/getMusicUrl', this.music_id)
  },
  mounted() {
    this.audio = this.$refs.player
  },
  methods: {
    previous() {
      this.autoplay = true
      this.music_id -= 1
      this.$store.dispatch('music/getMusicUrl', this.music_id)
    },
    next() {
      this.autoplay = true
      this.music_id += 1
      this.$store.dispatch('music/getMusicUrl', this.music_id)
    },
    repeat() {
      /* ループなし → ループ → 一曲ループ */
      if (this.repeatcolor === '') {
        this.repeatcolor = 'primary'
        this.loop = false
      } else if (!this.loop) {
        this.loop = true
      } else {
        this.repeatcolor = ''
        this.loop = false
      }
    },
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100000) * this.percentage
      )
    },
    stop() {
      this.paused = this.playing = false
      this.audio.pause()
      this.audio.currentTime = 0
    },
    play() {
      if (this.playing) return
      this.paused = false
      this.audio.play().then((_) => (this.playing = true))
    },
    pause() {
      this.paused = !this.paused
      this.paused ? this.audio.pause() : this.audio.play()
    },
    mute() {
      this.isMuted = !this.isMuted
      this.audio.muted = this.isMuted
      this.volumeValue = this.isMuted ? 0 : 75
    },
    reload() {
      this.audio.load()
    },
    loadedData() {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          this.audio.currentTime = 1e101
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {}
            this.audio.currentTime = 0
            this.totalDuration = parseInt(this.audio.duration)
            this.loaded = true
          }
        } else {
          this.totalDuration = parseInt(this.audio.duration)
          this.loaded = true
        }
      } else {
        throw new Error('Failed to load sound file')
      }
    },
    timeUpdate(e) {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100000
      this.currentTime = formatTime(this.audio.currentTime)
    },
    playPause(e) {
      if (e.type === 'play' && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0
        if (this.firstPlay) {
          this.firstPlay = false
        }
      }
      if (
        e.type === 'pause' &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = '00:00:00'
      }
    },
    ended() {
      if (this.music_id === this.$store.state.music.playList.length) {
        if (this.repeatcolor === '') {
          this.paused = this.playing = false
        } else {
          this.music_id = 0
        }
      } else {
        this.music_id += 1
      }
    }
  }
}
</script>
<style>
.v-slider__track-container {
  height: 5px !important;
}

.col {
  padding: 0 !important;
}
</style>
