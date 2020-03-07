interface Unit {
  id: string;
  name: string;
}

const state = {
  unit: {
    id: '1',
    name: '1.0',
  },
};

const actions = {};

const mutations = {};

const getters = {
  getUnitName: (state, getters, rootState, rootGetters) => {
    const unit: Unit = state.unit;

    console.log(unit);

    return unit.name;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
