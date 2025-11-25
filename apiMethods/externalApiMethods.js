const { machinesensor, machinesensorcount, ppSchema, ppcount } = require('../models/userCreationModel');


function getFormattedDateTime() {
  const now = new Date();

  let day = String(now.getDate()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  let year = now.getFullYear();

  let hours = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, '0');

  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // handle midnight (0)

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}
module.exports = (() => {
  const express = require('express');
  const router = express.Router();
  const firebaseService = require('../config/firebaseService');
  const axios = require("axios");
  const https = require("https");
  const config = require("../config/apiConfig");
  // Allow SAP self-signed SSL
  const sapAxios = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  const handleAxiosError = (error, functionName) => {
    console.error(`Error in ${functionName}:`, error.message);

    // Log detailed error information if available
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request made but no response received:", error.request);
    } else {
      console.error("Error details:", error.message);
    }

    // Return an error object to send a consistent response
    return { error: `Error processing your request in ${functionName}` };
  };



  const getAuthHeader = () => {
    if (!config.THIRD_PARTY_USERNAME || !config.THIRD_PARTY_PASSWORD) {
      throw new Error("Third-party API credentials are missing");
    }

    const credentials = `${config.THIRD_PARTY_USERNAME}:${config.THIRD_PARTY_PASSWORD}`;
    const token = Buffer.from(credentials).toString("base64");
    return `Basic ${token}`;
  };
  return {
    getMotorsLogsData: async (req, res) => {
      try {
        const data = await firebaseService.getMotorLogs();

        if (!data || data.length === 0) {
          return res.status(200).json({
            message: "No Data Available",
            data: [],
            status: 200
          })

        }

        res.status(200).json({
          message: "Data Fetched Successfully",
          data: data,
          status: 200
        })

      } catch (error) {
        res.status(500).json({
          message: "Failed to Fetch Data"
        })

      }

    },

    machinesensorSave: async (req, res) => {
      // console.log("newCompanyCreation ", req, res)
      console.log("newCompanyCreation request received", req);
      try {

        const { machine, sensor } = req;

        const counter = await machinesensorcount.findOneAndUpdate(
          { name: "machinesensorUniqueId" },
          { $inc: { value: 1 } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        const machinesensorUniqueId = counter.value;
        console.log("machinesensorUniqueId", machinesensorUniqueId);
        const Payload = new machinesensor({
          machine,
          sensor,
          machinesensorUniqueId
        })

        const storedData = await Payload.save()

        res.status(200).json({
          message: "Created Successfully",
          status: 200,
          data: storedData,
          machinesensorUniqueId
        })

      } catch (error) {
        console.error("Error in ::", error);
        res.status(500).json({
          message: "Failed to Save",
          status: 500,
          error: error.message
        })
      }
    },
    machinesensorUpdate: async (req, res) => {
      console.log("req.params:", req.params, "req.body:", req);

      try {
        const machinesensorUniqueId = Number(req.machinesensorUniqueId); // Convert to number
        if (isNaN(machinesensorUniqueId)) {
          return res.status(400).json({
            message: "Invalid Customer ID",
            status: 400
          });
        }

        const updateObj = req;
        console.log("companyUniqueId:", machinesensorUniqueId);
        console.log("updateObj:", updateObj);

        const updateUserObj = await machinesensor.findOneAndUpdate(
          { machinesensorUniqueId: machinesensorUniqueId },
          { $set: updateObj },
          { new: true, runValidators: true }
        );

        console.log("updateUserObj:", updateUserObj);

        if (!updateUserObj) {
          return res.status(404).json({
            message: "Not found based on given Id",
            status: 404
          });
        }

        res.status(200).json({
          message: "Data Updated Successfully",
          status: 200,
          updatedList: updateUserObj
        });

      } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({
          message: "Failed to Update",
          status: 500,
          error: error.message
        });
      }
    },
    machinesensorList: async (req, res) => {
      try {
        const List = await machinesensor.find()

        if (!List || List.length === 0) {
          return res.status(200).json({
            message: "No Data Available",
            List: [],
            status: 200
          })

        }

        res.status(200).json({
          message: "Data Fetched Successfully",
          data: List,
          status: 200
        })

      } catch (error) {
        res.status(500).json({
          message: "Failed to Fetch Data"
        })

      }

    },

    deleteGlobally: async (req, res) => {
      try {
        const { globalId, screenName } = req;
        console.log("globalId", globalId, "typeOfTable", screenName)
        if (!globalId || !screenName) {
          return res.status(400).json({ message: "Missing required fields", status: 400 });
        }

        let deletedRecord;

        switch (screenName) {
          case "machinesensor":
            deletedRecord = await machinesensor.findOneAndDelete({ machinesensorUniqueId: globalId });
            break;
          case "customer":
            deletedRecord = await customerCreation.findOneAndDelete({ customerUniqueId: globalId });
            break;

          default:
            return res.status(400).json({ message: "Invalid table type", status: 400 });
        }
        console.log("deletedRecord", deletedRecord)

        if (!deletedRecord) {
          return res.status(404).json({ message: "Record not found", status: 404 });
        }

        res.status(200).json({ message: "Record deleted successfully", status: 200 });
      } catch (error) {
        console.error("Error in deleteGlobally:", error);
        res.status(500).json({ message: "Deletion failed", status: 500, error: error.message });
      }
    },









    // sap api integration starts here 

    getProductionPlanning: async (body, res) => {
      try {
        console.log(
          "cooisoperation",
          JSON.stringify(body, null, 2)
        );
        const response = await sapAxios.post(
          config.ThirdParty_COOISOperations,
          body,
          {
            headers: {
              Authorization: getAuthHeader()
            }
          }
        );
        console.log(
          "coois operations:",
          JSON.stringify(response.data, null, 2)
        );
        res.json(response.data);
      } catch (error) {
        handleAxiosError(error, "coois operations");
        res.status(500).json({ error: "Failed to process Post request" });
      }
    },
    // pp
    //  productionPlanningSave: async (req, res) => {
    //   // console.log("newCompanyCreation ", req, res)
    //   console.log("newCompanyCreation request received", req);
    //   try {

    //     const {productionPlanningUniqueId, productionOrderNumber,activity,productName,productDes,workCenterOrMachine,sensor,operationDes,quantity,unit,startDate,endDate,shifts,supervisorName,status,createdUser } = req;

    //     // const counter = await ppcount.findOneAndUpdate(
    //     //   { name: "productionPlanningUniqueId" },
    //     //   { $inc: { value: 1 } },
    //     //   { new: true, upsert: true, setDefaultsOnInsert: true }
    //     // );
    //     // const productionPlanningUniqueId = counter.value;
    //     // const productionPlanningUniqueId = productionOrderNumber+activity;
    //     console.log("productionPlanningUniqueId", productionPlanningUniqueId);

    //     let createdDateAndTime = getFormattedDateTime()
    //     const Payload = new ppSchema({
    //       productionOrderNumber,
    //       activity,productName,
    //       productDes,
    //       workCenterOrMachine,
    //       sensor,
    //       operationDes,
    //       quantity,
    //       unit,
    //       startDate,
    //       endDate,
    //       shifts,
    //       supervisorName,
    //       status,
    //       createdDateAndTime,
    //       createdUser,
    //       productionPlanningUniqueId
    //     })

    //     const storedData = await Payload.save()

    //     res.status(200).json({
    //       message: "Created Successfully",
    //       status: 200,
    //       data: storedData,
    //       productionPlanningUniqueId
    //     })

    //   } catch (error) {
    //     console.error("Error in ::", error);
    //     res.status(500).json({
    //       message: "Failed to Save",
    //       status: 500,
    //       error: error.message
    //     })
    //   }
    // },
    // productionPlanningSave: async (req, res) => {
    //   try {

    //     const items = req; // <-- receive array
    //     console.log("req.body",req)
    //     if (!Array.isArray(items)) {
    //       return res.status(400).json({ message: "Input must be an array" });
    //     }

    //     let savedItems = [];

    //     for (const item of items) {

    //       const {
    //         productionPlanningUniqueId,
    //         productionOrderNumber,
    //         activity,
    //         productName,
    //         productDes,
    //         workCenterOrMachine,
    //         sensor,
    //         operationDes,
    //         quantity,
    //         unit,
    //         startDate,
    //         endDate,
    //         shifts,
    //         supervisorName,
    //         status,
    //         createdUser
    //       } = item;

    //       // Auto-generate date & time
    //       const createdDateAndTime = getFormattedDateTime();

    //       const Payload = new ppSchema({
    //         productionPlanningUniqueId,
    //         productionOrderNumber,
    //         activity,
    //         productName,
    //         productDes,
    //         workCenterOrMachine,
    //         sensor,
    //         operationDes,
    //         quantity,
    //         unit,
    //         startDate,
    //         endDate,
    //         shifts,
    //         supervisorName,
    //         status,
    //         createdDateAndTime,
    //         createdUser
    //       });

    //       const storedData = await Payload.save();
    //       savedItems.push(storedData);
    //     }

    //     res.status(200).json({
    //       message: "Saved Successfully",
    //       status: 200,
    //       data: savedItems
    //     });

    //   } catch (error) {
    //     console.error("Error in Save:", error);
    //     res.status(500).json({
    //       message: "Failed to Save",
    //       status: 500,
    //       error: error.message
    //     });
    //   }
    // }
    productionPlanningSave: async (req, res) => {
      try {

        const items = req.body;   // ✅ FIXED
        console.log("req.body", req.body, req)

        if (!Array.isArray(items)) {
          return res.status(400).json({ message: "Input must be an array" });
        }

        let validationErrors = [];

        for (const item of items) {

          const requiredFields = [
            "productionPlanningUniqueId",
            "productionOrderNumber",
            "activity",
            "productName",
            "productDes",
            "workCenterOrMachine",
            "sensor",
            "operationDes",
            "quantity",
            "unit",
            "startDate",
            "endDate",
            "shifts",
            "supervisorName",
            "createdUser"
          ];

          const missing = requiredFields.filter(field => !item[field]);

          if (missing.length > 0) {
            validationErrors.push({
              orderNumberAndActivity: item.productionPlanningUniqueId,
              message: `Missing fields: ${missing.join(", ")}`
            });
          }
        }

        if (validationErrors.length > 0) {
          return res.status(200).json({
            message: "Validation Failed",
            status: 500,
            errors: validationErrors
          });
        }

        let savedItems = [];
        for (const item of items) {

          const createdDateAndTime = getFormattedDateTime();

          const Payload = new ppSchema({
            ...item,
            createdDateAndTime
          });

          const storedData = await Payload.save();
          savedItems.push(storedData);
        }

        res.status(200).json({
          message: "Saved Successfully",
          status: 200,
          data: savedItems
        });

      } catch (error) {
        console.error("Error in Save:", error);

        if (error.code === 11000) {
          return res.status(409).json({
            message: "Duplicate Entry Error",
            status: 409,
            error: `Duplicate value for: ${JSON.stringify(error.keyValue)}`
          });
        }

        res.status(500).json({
          message: "Failed to Save",
          status: 500,
          error: error.message
        });
      }
    }



  }




})();
