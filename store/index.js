export const state = () => ({
  active_tab: 0
})

export const mutations = {
  setActiveTab(state, activetab) {
    state.active_tab = activetab
  }
}
