export const state = () => ({
  departments: [],
});

export const getters = {
  getDepartments(state) {
    return state.departments;
  },
  forSelectList(state, getters) {
    const array = [{ name: "---", id: null }];
    return array.concat(getters.getDepartments);
  },
};

export const mutations = {
  setDepartments(state, departments) {
    state.departments = departments;
  },
  resetDepartments(state) {
    state.departments = {};
  },
};

export const actions = {
  async fetchDepartments({ commit }) {
    await this.axios.get("/api/getDepartments").then((res) => {
      commit("setDepartments", res.data[0]);
    });
  },
};
