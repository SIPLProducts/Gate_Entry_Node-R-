module.exports = (() => {
  const express = require("express");
  const router = express.Router();
  const externalApiHandler = require("../handlers/externalApiHandler");

  
  router.get('/Iot_Fetch_Data/MotorsLogs',externalApiHandler.getMotorsLogsData);


router.post('/Smart_Factory/SaveMachineSensor',externalApiHandler.machineSensor);
router.post('/Smart_Factory/MachineSensorUpdate',externalApiHandler.machineSensorupdate);
router.get('/Smart_Factory/MachineSensList',externalApiHandler.machinesensorlist);
router.post('/Smart_Factory/Global_Delete',externalApiHandler.globalDelete);

// sap api integration api 
router.post('/SAP_API/COOIS_Operation',externalApiHandler.cooisOperation);

router.post('/Smart_Factory/SaveProductionPlanning',externalApiHandler.ppSave);

  return router;
})();
