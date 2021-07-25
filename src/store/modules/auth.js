import Vue from "vue";
import router from "@/router";
import { VueAuthenticate } from "vue-authenticate";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
const API_URL = process.env.VUE_APP_API_BASE_URL;

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: process.env.VUE_APP_API_BASE_URL ? process.env.VUE_APP_API_BASE_URL : API_URL,
  tokenName: "access_token",
  loginUrl: "/login",
  registerUrl: "/register"
});

export default {
  state: {
    isAuthenticated: localStorage.getItem("vue-authenticate.vueauth_access_token") !== null,
    // isMiddlewareVerified: ""
  },

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    // isMiddlewareVerified(state) {
    //   return state.isMiddlewareVerified;
    // }
  },

  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    }
  },

  actions: {
    login(context, payload) {
      return vueAuth.login(payload.user, payload.requestOptions).then(response => {
        context.commit("isAuthenticated", {
          isAuthenticated: vueAuth.isAuthenticated()
        });
      });
    },

    register(context, payload) {
      return vueAuth.register(payload.user, payload.requestOptions).then(response => {
        context.commit("isAuthenticated", {
          isAuthenticated: vueAuth.isAuthenticated()
        });
      });
    },

    logout(context, payload) {
      return vueAuth.logout().then(response => {
        context.commit("isAuthenticated", {
          isAuthenticated: vueAuth.isAuthenticated()
        });
        router.push({name: "login"});
      });
    },

    forgotPassword(context, params) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      return axios
          .post(API_URL + '/password/email', params, config)
          .then(response => {
            return response.data;
          });
    },

    resetPassword(context, params) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      return axios
          .post(API_URL + '/password/email', params, config)
          .then(response => {
            return response.data;
          });
    },

    verifyMiddleware(context) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      return axios
          .post(API_URL + '/middleware-verification', config)
          .then(response => {
            // context.commit("isMiddlewareVerified", {
            //   isMiddlewareVerified: response.data.message
            // });
            return response.data;
          });
    },
  }
};
