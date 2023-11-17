import mongoose from 'mongoose'

const connectDB = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_URL)
      console.log(`connected to Database `)
   } catch (error) {
      console.log(`Error when connect to monodb `)
   }
}

export default connectDB
