const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const qrCode=require("../models/QRcode");
require('dotenv').config();

exports.staticQR=async(req,res)=>{
    try
    {
        const { url, metadata } = req.body;
        const qrData = JSON.stringify({ url, metadata });
        const qrCodeImage = await QRCode.toDataURL(qrData);

        res.status(200).json({
            success: true,
            message: "QR Code generated successfully",
            qrCode: qrCodeImage,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error in generating qr",
        });
    }
}

exports.dynamicQR=async(req,res)=>{
    try{
        const { url, metadata } = req.body;
        const qrId = uuidv4();
        const redirectUrl = `${process.env.DOMAIN_NAME}/redirect/${qrId}`;

        const dynamicQRCode = await qrCode.create({
            qrId,
            url,
            userid:req.user.id,
            metadata,
        });

        const qrCodeImage = await QRCode.toDataURL(redirectUrl);

        res.status(200).json({
            success: true,
            qrCodeImage,
            qrId,
            message: "QR Code generated successfully",
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error in generating qr",
        });
    }
}