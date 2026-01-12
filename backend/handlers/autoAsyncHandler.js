module.exports = function autoAsyncHandler(router) {
  const methods = ["get", "post", "put", "patch", "delete"];

  methods.forEach((method) => {
    const original = router[method];

    router[method] = function (path, ...handlers) {
      const wrappedHandlers = handlers.map((h) => async (req, res, next) => {
        try {
          await h(req, res, next);
        } catch (err) {
          next(err);
        }
      });

      return original.call(router, path, ...wrappedHandlers);
    };
  });

  return router;
};
