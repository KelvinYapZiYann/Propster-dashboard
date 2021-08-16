// eslint-disable-next-line no-unused-vars
import store from "../store";
import errorHandlingService from "@/store/services/error-handling-service";

// eslint-disable-next-line no-unused-vars
export default function authSession({ next, router }) {
  if (store.getters.isAuthenticated) {
    // if () {

    // }
    // store.dispatch('verifyMiddleware').then(() => {
      return router.push({ name: "Home" });
    // })
    // .catch((e) => {
    //   try {
    //     errorHandlingService.verifyErrorFromServer(e);
    //   } catch(e1) {
    //     throw e1;
    //   }
    // });
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
