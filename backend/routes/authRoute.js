import express from 'express'
import { loginController, registerController, testController } from './../controllers/authController.js'
import { isAdmin, requireJWT } from '../middlewares/authMiddlewares.js'

const router = express.Router()
// register
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', requireJWT, isAdmin, testController)
router.get('/get', (req, res) => {
   return res.send('ngu')
})

export default router
