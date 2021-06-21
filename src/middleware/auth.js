// eslint-disable-next-line no-unused-vars
import store from "../store";

// eslint-disable-next-line no-unused-vars
export default function auth({ next, router }) {
alert(process.env.VUE_APP_API_BASE_URL)
  alert(store.getters.isAuthenticated);
  if (!store.getters.isAuthenticated) {
    return router.push({ name: "login" });
  }

  return next();
}
