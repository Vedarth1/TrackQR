const express=require("express");
const router=express.Router();

const {login,signup} = require("../controllers/Auth");
const {auth}=require("../middlewares/auth");
const { staticQR, dynamicQR } = require("../controllers/GenerateQr");
const { getQR, updateQR } = require("../controllers/Handleqr");

router.post("/login",login);
router.post("/signup",signup);
router.post("/staticQR",auth,staticQR);
router.post("/dynamicQR",auth,dynamicQR);
router.get("/redirect/:qrId",getQR);
router.put("/update/:qrId",updateQR);

module.exports=router;