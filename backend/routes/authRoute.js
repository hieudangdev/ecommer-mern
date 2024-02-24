import express from 'express'
import { changeProfile, loginController, registerController, testController } from './../controllers/authController.js'
import { isAdmin, requireJWT } from '../middlewares/authMiddlewares.js'

const router = express.Router()
// register
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', requireJWT, isAdmin, testController)
router.post('/changeprofile', requireJWT, changeProfile)

export default router
