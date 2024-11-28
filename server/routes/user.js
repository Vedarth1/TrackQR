const express=require("express");
const router=express.Router();

const {login,signup, getUser} = require("../controllers/Auth");
const {auth}=require("../middlewares/auth");
const { staticQR, dynamicQR } = require("../controllers/GenerateQr");
const { getQR, updateQR, getAllqr, getqrbyid } = require("../controllers/Handleqr");
const { trackevent, getallevent, getCount } = require("../controllers/Event");

router.post("/auth/login",login);
router.post("/auth/signup",signup);
router.get("/auth/me",auth,getUser);
router.get("/qr/my-codes",auth,getAllqr);
router.post("/staticQR",auth,staticQR);
router.post("/dynamicQR",auth,dynamicQR);
router.get("/qr/:qrId/get",auth,getqrbyid);
router.get("/redirect/:qrId",getQR);
router.put("/qr/:qrId/update",auth,updateQR);
router.post("/qr/:qrId/track",auth,trackevent);
router.get("/qr/:qrId/events",auth,getallevent);
router.get("/qr/:qrId/analytics",auth,getCount);

module.exports=router;