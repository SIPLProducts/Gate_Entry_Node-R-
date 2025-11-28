const admin = require('firebase-admin');

const serviceAccount = require('../config/digi-asset-managment-firebase-adminsdk-fbsvc-c48687b4ae.json');

// 1. Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Replace with your database URL from the image: 
  // https://digi-asset-managment-default-rtdb.firebaseio.com
  databaseURL: "https://digi-asset-managment-default-rtdb.firebaseio.com/"
});

const db = admin.database();

// 2. Function to fetch data from the 'motorlogs' path
async function getMotorLogs() {
  const motorlogsRef = db.ref('motorlogs'); // 'motorlogs' is the path from your image
  
  try {
    const snapshot = await motorlogsRef.once('value');
    // .val() converts the snapshot into a JavaScript object/array
    return snapshot.val(); 
  } catch (error) {
    console.error("Error fetching motorlogs data:", error);
    throw new Error("Failed to fetch motorlogs from Firebase");
  }
}
async function getSensorData() {
  const sensorsRef = db.ref('sensor'); // 'motorlogs' is the path from your image
  
  try {
    const snapshot = await sensorsRef.once('value');
    // .val() converts the snapshot into a JavaScript object/array
    return snapshot.val(); 
  } catch (error) {
    console.error("Error fetching motorlogs data:", error);
    throw new Error("Failed to fetch motorlogs from Firebase");
  }
}

module.exports = {
  getMotorLogs,getSensorData
};