export const state = () => ({
  musics: [],
  playList: [],
  music: 0,
  albums: [],
  album: {},
  artists: []
})

export const mutations = {
  setMusics(state, musics) {
    state.musics = musics
  },
  setPlayList(state, playList) {
    state.playList = playList
  },
  setMusicUrl(state, id, url) {
    state.playList[id].file_url = url
  },
  setAlbums(state, albums) {
    state.albums = albums
  },
  setAlbum(state, album) {
    state.album = album
  },
  setArtists(state, artists) {
    state.artists = artists
  }
}

export const actions = {
  async getMusics(context) {
    let payload = []
    await this.$axios.get('musics').then((res) => {
      payload = res.data // eslint-disable-line
    })
    context.commit('setMusic', payload) // eslint-disable-line
  },
  async getMusicUrl(context, id) {
    const music = context.state.playList[id]
    await this.$axios.get('musics/' + music.id.toString()).then((res) => {
      payload = res.data // eslint-disable-line
    })
    context.commit('setMusicUrl', { id: id, url: payload}) // eslint-disable-line
  },
  async getAlbums(context) {
    let payload = []
    await this.$axios.get('albums').then((res) => {
      payload = res.data
    })
    context.commit('setAlbums', payload)
  },
  async getAlbum(context, id) {
    let payload = []
    await this.$axios.get('albums/' + id.toString()).then((res) => {
      payload = res.data
    })
    context.commit('setAlbum', payload)
  },
  async getAlbumMusics(context, id) {
    let payload = []
    await this.$axios.get('musics?album_id=' + id.toString()).then((res) => {
      payload = res.data
    })
    context.commit('setPlayList', payload)
  },
  async getArtists(context) {
    let payload = []
    await this.$axios.get('artists').then((res) => {
      payload = res.data
    })
    context.commit('setArtists', payload)
  }
}
