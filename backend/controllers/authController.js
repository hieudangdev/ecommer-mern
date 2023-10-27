export const registerController = async (req, res) => {
   try {
      res.send('test')
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: 'Error in Register',
         error,
      })
   }
}
