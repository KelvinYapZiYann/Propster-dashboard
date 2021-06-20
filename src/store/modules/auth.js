import AuthService from "../services/auth-service";
import router from "@/routers";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

const getters = {
  isAuthenticated: state => state.status.loggedIn
};

const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.status.loggedIn = false;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  },
}

const actions = {
  login({ commit }, user) {
    return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          router.push({path: "/dashboard"});
          return Promise.resolve(user);
        },
        (error) => {
          console.log(error);
          commit("loginFailure");
          return Promise.reject(error);
        }
    );
  },
  logout({ commit }) {
    AuthService.logout();
    commit("logout");
    router.push({name: "Login"});
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          router.push({path: "/dashboard"});
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
    );
  }
}

const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default auth;