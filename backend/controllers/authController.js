import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from './../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) => {
   try {
      const { email, name, password } = req.body
      if (!name) {
         return res.send({ error: 'Name is Required' })
      }
      if (!email) {
         return res.send({ error: 'email is Required' })
      }
      if (!password) {
         return res.send({ error: 'password is Required' })
      }

      const exisitingUser = await userModel.findOne({ email })
      if (exisitingUser) {
         return res.status(201).send({
            success: true,
            message: 'Already register please login',
         })
      }

      const hashedPassword = await hashPassword(password)
      const user = await new userModel({ name, email, password: hashedPassword }).save()

      res.status(200).send({
         success: true,
         message: 'Register success',
         user,
      })
   } catch (error) {
      res.status(500).send({
         success: false,
         message: 'Error in Register',
         error,
      })
   }
}

export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body
      if (!email || !password) {
         res.status(500).send({
            success: false,
            message: 'Invalid Email or Password !',
         })
      }
      const user = await userModel.findOne({ email })
      if (!user) {
         res.status(500).send({
            success: false,
            message: 'Email is not register !',
         })
      }
      const matchPassword = await comparePassword(password, user.password)
      if (!matchPassword) {
         res.status(500).send({
            success: false,
            message: 'Password is incorrect',
         })
      }
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '7d',
      })

      res.status(200).send({
         success: true,
         message: 'login success',
         user: {
            user_id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
         },
         token,
      })
   } catch (error) {
      res.status(500).send({
         success: false,
         message: 'Error in login',
         error,
      })
   }
}
export const testController = async (req, res) => {
   try {
      res.send('Protected Routes and Admin')
   } catch (error) {
      console.log(error)
      res.send({ error })
   }
}

export const changeProfile = async (req, res) => {
   try {
      const result = await userModel.findByIdAndUpdate(req.user._id, { role: req.body.role })
      res.send(result)
   } catch (error) {
      console.log(error)
      res.send({ error })
   }
}
