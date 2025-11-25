
module.exports = (() => {
  const externalApiMethods = require("../apiMethods/externalApiMethods");


  return {
    getMotorsLogsData: (req, res) => externalApiMethods.getMotorsLogsData(req.body, res),
    machineSensor: (req, res) => externalApiMethods.machinesensorSave(req.body, res),
   machineSensorupdate: (req, res) => externalApiMethods.machinesensorUpdate(req.body, res),
      machinesensorlist: (req, res) => externalApiMethods.machinesensorList(req.body, res),
      globalDelete: (req, res) => externalApiMethods.deleteGlobally(req.body, res),
      cooisOperation: (req, res) => externalApiMethods.getProductionPlanning(req.body, res),

ppSave: (req, res) => externalApiMethods.productionPlanningSave(req, res),
  };
})();
