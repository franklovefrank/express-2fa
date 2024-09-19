import express from 'express';
import AuthController from '../controllers/auth';
import { isAuthenticated, isUnauthenticated } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: The user's username or email
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: The user's username
 *                   example: testuser
 *                 mobile:
 *                   type: string
 *                   description: The user's mobile number
 *                   example: "+1234567890"
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   example: testuser@example.com
 *       401:
 *         description: Incorrect credentials
 */
router.route('/login').post(isUnauthenticated, AuthController.login);

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: Verify the provided code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - code
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               code:
 *                 type: string
 *                 description: The verification code sent to the user's mobile number
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Verification successful and user logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: "Login successful"
 *       401:
 *         description: Invalid verification code
 *       500:
 *         description: Failed to verify code
 */
router.post('/verify-code', AuthController.verifyCode);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.route('/logout').post(isAuthenticated, AuthController.logout);

/**
 * @swagger
 * /api/auth/authenticated:
 *   get:
 *     summary: Check if the user is authenticated
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: User is not authenticated
 */
router.route('/authenticated').get(AuthController.authenticated);



export default router;
