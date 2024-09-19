import express from 'express';

import UsersController, { updatePassword, updateUserDetails } from '../controllers/users';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username (minimum 5 characters)
 *                 example: testuser
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: testuser@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile phone number
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: The user's password (minimum 8 characters)
 *                 example: securepassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email or mobile number already exists
 */
router.route('/').post(UsersController.create);

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desired_username:
 *                 type: string
 *                 description: The desired new username of the user (optional)
 *               desired_email:
 *                 type: string
 *                 description: The desired new email of the user (optional)
 *     responses:
 *       200:
 *         description: Successfully updated user details
 *       400:
 *         description: Bad request (e.g., missing required fields or incorrect credentials)
 *       401:
 *         description: Unauthorized (e.g., invalid 2FA code or authentication failure)
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
router.put('/update', isAuthenticated, updateUserDetails);

/**
 * @swagger
 * /api/users/update-password:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desired_password:
 *                 type: string
 *                 description: The new password of the user
 *                 example: newsecurepassword
 *     responses:
 *       200:
 *         description: Successfully updated password
 *       400:
 *         description: Bad request (e.g., missing required fields or incorrect credentials)
 *       401:
 *         description: Unauthorized (e.g., 2FA not completed)
 *       500:
 *         description: Error updating password
 */
router.patch('/update-password', isAuthenticated, updatePassword);

export default router;