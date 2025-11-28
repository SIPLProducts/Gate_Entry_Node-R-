const mongoose = require('mongoose');

const machinesensorCountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },

    value: {
        type: Number,
        default: 800,
    },
});
const machinesensorSchema = new mongoose.Schema({
    
    machinesensorUniqueId: {
        type: Number,
        required: true,
        unique: true
    },
    machine: {
        type: String,
        required: true,
    },
    sensor: {
        type: String,
        required: true,
    },
    
});

const productionPlaningCountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },

    value: {
        type: Number,
        default: 800,
    },
});
const productionPlanningSchema = new mongoose.Schema({
    
    productionPlanningUniqueId: {
        type: Number,
        required: true,
        unique: true
    },
    productionOrderNumber: {
        type: Number,
        required: true,
    },
    activity: {
        type: Number,
        required: true,
    },
      productName: {
        type: String,
        required: true,
    },
        productDes: {
        type: String,
        required: true,
    },
        workCenterOrMachine: {
        type: String,
        required: true,
    },
      sensor: {
        type: Number,
        required: true,
    },
       operationDes: {
        type: String,
        required: true,
    },
       quantity: {
        type: Number,
        required: true,
    },
       unit: {
        type: String,
        required: true,
    },
       startDate: {
        type: String,
        required: true,
    },
      endDate: {
        type: String,
        required: true,
    },
      shifts: {
        type: String,
        required: true,
    },
      supervisorName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
     createdDateAndTime: {
        type: String,
        required: true,
    },
     createdUser: {
        type: String,
        required: true,
    },
    selected:{
        type:Boolean,
        required: true,
    }

    
});


const userCountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },

    value: {
        type: Number,
        default: 800,
    },
});

// user creation 
const userCreationSchema = new mongoose.Schema({
    userUniqueId: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    userFirstName: {
        type: String,
        required: true,
    },
    userLastName: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userContact: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userConfirmPassword: {
        type: String,
        required: true,
    },
    userStatus: {
        type: Boolean,
        required: true,
    },
    userActivity: {
        type: String,
        required: true,
    },




});



const machinesensor = mongoose.model('machineSensor', machinesensorSchema);
const machinesensorcount = mongoose.model('machineSensorCount',machinesensorCountSchema)
// pp
const ppSchema = mongoose.model('ProductionPlaning', productionPlanningSchema);
const ppcount = mongoose.model('productionPlaningPCount',productionPlaningCountSchema)

const userCreation = mongoose.model('userCreation', userCreationSchema);
const userCount = mongoose.model('userCount', userCountSchema);

// Export as an object
module.exports = {machinesensor,machinesensorcount,ppSchema,ppcount,userCreation, userCount};
