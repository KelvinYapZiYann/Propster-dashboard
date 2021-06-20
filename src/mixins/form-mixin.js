export default {
  data() {
    return {
      isLoading: false,
      apiValidationErrors: {}
    };
  },
  methods: {
    /* extract API server validation errors and assigns them to local mixin data */
    setApiValidation(response, refs = null) {
      let jsonResult = {};
      for (let r in response) {
        jsonResult[r] = response[r];
      }

      this.apiValidationErrors = jsonResult;  
    },

    resetApiValidation() {
      this.apiValidationErrors = {};
    }
  }
};
