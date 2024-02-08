const cron = require('node-cron');

const user = () => { cron.schedule('*/10 * * * * *',((req,res)=>{
    const userName = req.user.data.userName
    const userEmail= req.user.data.userEmail
    res.json({message : 'user access area',userName,userEmail})
  }))}
  
module.exports = {user}