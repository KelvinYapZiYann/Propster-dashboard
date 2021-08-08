// eslint-disable-next-line no-unused-vars
import store from "../store";

// eslint-disable-next-line no-unused-vars
export default function authSession({ next, router }) {
  if (store.getters.isAuthenticated) {
    return router.push({ name: "Home" });
  }
  // try {
  //   if (store.getters.isAuthenticated) {
  //     store.dispatch("logout");
  //   }
  // } catch (e) {
  //   console.log(e);
  // }

  return next();
}
