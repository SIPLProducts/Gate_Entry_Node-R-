module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const externalRoutes = require("./externalRoutes");

  // Attach external routes
  router.use("/external", externalRoutes);



  return router;
})();
