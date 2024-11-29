const express = require("express");
const router = express.Router();

// Importing controllers
const { login, signup, getUser } = require("../controllers/Auth");
const { staticQR, dynamicQR } = require("../controllers/GenerateQr");
const { getQR, updateQR, getAllqr, getqrbyid } = require("../controllers/Handleqr");
const { trackevent, getallevent, getCount } = require("../controllers/Event");

// Importing middlewares
const { auth } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/auth/signup", signup);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved user data
 */
router.get("/auth/me", auth, getUser);

/**
 * @swagger
 * tags:
 *   name: QR Codes
 *   description: QR Code generation and management
 */

/**
 * @swagger
 * /qr/my-codes:
 *   get:
 *     tags: [QR Codes]
 *     summary: Get all QR codes for the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of QR codes
 */
router.get("/qr/my-codes", auth, getAllqr);

/**
 * @swagger
 * /staticQR:
 *   post:
 *     tags: [QR Codes]
 *     summary: Generate a static QR code
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Static QR code generated
 */
router.post("/staticQR", auth, staticQR);

/**
 * @swagger
 * /dynamicQR:
 *   post:
 *     tags: [QR Codes]
 *     summary: Generate a dynamic QR code
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               initialURL:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Dynamic QR code generated
 */
router.post("/dynamicQR", auth, dynamicQR);

/**
 * @swagger
 * /qr/{qrId}/get:
 *   get:
 *     tags: [QR Codes]
 *     summary: Get details of a QR code by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: QR code details retrieved
 */
router.get("/qr/:qrId/get", auth, getqrbyid);

/**
 * @swagger
 * /redirect/{qrId}:
 *   get:
 *     tags: [QR Codes]
 *     summary: Redirect to the URL encoded in a QR code
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect successful
 */
router.get("/redirect/:qrId", getQR);

/**
 * @swagger
 * /qr/{qrId}/update:
 *   put:
 *     tags: [QR Codes]
 *     summary: Update the URL of a dynamic QR code
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: QR code updated successfully
 */
router.put("/qr/:qrId/update", auth, updateQR);

/**
 * @swagger
 * tags:
 *   name: Event Tracking
 *   description: Event tracking and analytics for QR codes
 */

/**
 * @swagger
 * /qr/{qrId}/track:
 *   post:
 *     tags: [Event Tracking]
 *     summary: Track an event for a QR code
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: object
 *     responses:
 *       201:
 *         description: Event tracked successfully
 */
router.post("/qr/:qrId/track", auth, trackevent);

/**
 * @swagger
 * /qr/{qrId}/events:
 *   get:
 *     tags: [Event Tracking]
 *     summary: Get all events for a QR code
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events retrieved
 */
router.get("/qr/:qrId/events", auth, getallevent);

/**
 * @swagger
 * /qr/{qrId}/analytics:
 *   get:
 *     tags: [Event Tracking]
 *     summary: Get analytics (scan count) for a QR code
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qrId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan count retrieved
 */
router.get("/qr/:qrId/analytics", auth, getCount);

module.exports = router;