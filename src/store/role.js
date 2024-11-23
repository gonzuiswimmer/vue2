export const state = () => ({
  role: '',
})

export const getters = {
  judgeAdmin(state) {
    return state.role === 'admin'
  },
}

export const mutations = {
  setUserRole(state, role) {
    state.role = role
  },
  resetUserRole(state) {
    state.role = ''
  },
}

export const actions = {
  // async fetchCounter({ state }) {
  //   // make request
  //   const res = { data: 10 };
  //   state.counter = res.data;
  //   return res.data;
  // }
}
