const mongoose = require("mongoose");

const dynamicQRCodeSchema = new mongoose.Schema({
    qrId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    userid:{
        type: String, 
        required: true
    },
    url: { 
        type: String, 
        required: true 
    },
    metadata: { 
        type: Object, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("qrCode", dynamicQRCodeSchema);
