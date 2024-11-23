import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'userRole',
    paths: ['role'],
  })(store)
}
