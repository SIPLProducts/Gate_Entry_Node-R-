module.exports = (() => {
  const express = require("express");
  const router = express.Router();
  const externalApiHandler = require("../handlers/externalApiHandler");


  router.get('/Iot_Fetch_Data/MotorsLogs', externalApiHandler.getMotorsLogsData);


  router.post('/Smart_Factory/SaveMachineSensor', externalApiHandler.machineSensor);
  router.post('/Smart_Factory/MachineSensorUpdate', externalApiHandler.machineSensorupdate);
  router.get('/Smart_Factory/MachineSensList', externalApiHandler.machinesensorlist);
  router.post('/Smart_Factory/Global_Delete', externalApiHandler.globalDelete);

  // sap api integration api 
  router.post('/SAP_API/COOIS_Operation', externalApiHandler.cooisOperation);

  router.post('/Smart_Factory/SaveProductionPlanning', externalApiHandler.ppSave);
  router.get('/Smart_Factory/GetProductionPlaning', externalApiHandler.ppGet);

  router.post('/Smart_Factory/userNewCreation', externalApiHandler.userCreationNew);
  router.put('/Smart_Factory/updateExitUser/:UniqueId', externalApiHandler.updateUserCreation);
  router.get('/Smart_Factory/getAllUserList', externalApiHandler.getAllUser);
  router.post('/Smart_Factory/authenticationLogin', externalApiHandler.submitLogin);
  router.post('/Smart_Factory/resetPassword', externalApiHandler.reset);
  router.post('/Smart_Factory/forgotPassword', externalApiHandler.forgot);

  router.post('/Gate_Entry/fetchPdfGateEntry', externalApiHandler.fetchGateEntryPdf);
  router.post('/Gate_Entry/GateEntryCreation', externalApiHandler.GateEntryCreation);
  
  router.post('/Gate_Entry/fetchGateEntryChange', externalApiHandler.fetchGateEntryChange);
  router.post('/Gate_Entry/GateEntryChange', externalApiHandler.GateEntryChange);
  
  return router;
})();
