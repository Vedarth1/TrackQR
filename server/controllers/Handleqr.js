const qrCode=require("../models/QRcode");

exports.getQR=async(req,res)=>{
    try
    {
        const { qrId } = req.params;
        const qrData = await qrCode.findOne({ qrId });
        if(!qrData) {
            return res.status(404).json({ 
                success: false, 
                message: "QR Code not found" 
            });
        }
        res.redirect(qrData.url);
    }
    catch(error)
    {
        console.error("Error handling QR Code redirection:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error redirecting to URL" 
        });
    }
}

exports.getqrbyid=async(req,res)=>{
    try
    {
        const { qrId } = req.params;
        const qrData = await qrCode.findOne({ qrId });
        if(!qrData) {
            return res.status(404).json({ 
                success: false, 
                message: "QR Code not found" 
            });
        }

        res.status(200).json({
            success: true,
            qrData
        });
    }
    catch(error)
    {
        console.error("Error handling QR Code redirection:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error redirecting to URL" 
        });
    }
}

exports.updateQR=async(req,res)=>{
    try
    {
        const { qrId } = req.params;
        const { newUrl } = req.body;
        
        const updatedQRCode = await qrCode.findOneAndUpdate(
            { qrId },
            { url: newUrl, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedQRCode) {
            return res.status(404).json({ 
                success: false, 
                message: "QR Code not found" 
            });
        }

        res.status(200).json({
            success: true,
            updatedQRCode,
            message: "QR Code URL updated successfully",
        });
    }
    catch(error)
    {
        console.error("Error handling QR Code redirection:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error in updating QR"
        });
    }
}

exports.getAllqr=async(req,res)=>{
    try 
    {
        const userid=req.user.id;
        const qrs=await qrCode.find({userid});

        res.status(200).json({
            success: true,
            qrs,
        });
    } 
    catch (error) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Server Error!"
        });
    }
}