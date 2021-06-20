// eslint-disable-next-line no-unused-vars
import store from "../store";

// eslint-disable-next-line no-unused-vars
export default function auth({ next, router }) {

  alert(store.getters.isAuthenticated);
  if (!store.getters.isAuthenticated) {
    return router.push({ name: "login" });
  }

  return next();
}
