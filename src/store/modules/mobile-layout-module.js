const state = {
    isMobileLayout: false,
};

const actions = {
    update({commit, dispatch}, params) {
        state.isMobileLayout = params;
    }
};

const getters = {
    isMobileLayout: state => state.isMobileLayout,
};

const mobileLayout = {
    namespaced: true,
    state,
    getters,
    actions,
};

export default mobileLayout;