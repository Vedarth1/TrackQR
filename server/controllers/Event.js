const Event = require("../models/Event");
const qrCode=require("../models/QRcode");

exports.trackevent=async(req,res)=>{
    try{
        const { qrId } = req.params;
        const { location, deviceType } = req.body;
        const qrcode=await qrCode.findOne({ qrId });
        if(!qrcode){
            return res.status(404).json({
              success: false,
              message: "QR Code not found",
            });
        }

        const event = new Event({
            qrId,
            location,
            url:qrcode.url,
            deviceType,
        });

        await event.save();

        res.status(200).json({
        success: true,
        message: "Event tracked successfully",
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: "Error tracking event",
        });
    }
}

exports.getallevent=async (req, res) => {
    try {
      const { qrId } = req.params;
      const qrcode = await qrCode.findOne({ qrId});

      if (!qrcode) {
        return res.status(404).json({
        success: false,
        message: "QR Code not found",
        });
      }
  
      const events = await Event.find({ qrId }).sort({ timestamp: -1 });
  
      res.status(200).json({
        success: true,
        events,
        message: "Events retrieved successfully",
      });

    } 
    catch (error) 
    {
        console.error("Error retrieving events:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving events",
        });
    }
};

exports.getCount=async (req, res) => {
    try 
    {
        const { qrId } = req.params;
        const totalScans = await Event.countDocuments({ qrId });
    
        if (totalScans === 0) {
            return res.status(404).json({
            success: false,
            message: "No scans found for this QR code",
            });
        }
  
        res.status(200).json({
            success: true,
            data: {
                totalScans,
            },
            message: "Analytics retrieved successfully",
        });
    } 
    catch(error)
    {
        console.error("Error retrieving analytics:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving analytics",
        });
    }
};
  