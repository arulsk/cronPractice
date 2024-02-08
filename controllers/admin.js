const cron = require('node-cron')
const protected = ()=>{ cron.schedule("5 4 * * sun",((req,res)=>{
    const user = req.user;
     res.json({ message: 'This is a protected route', user });
  
  }))}
module.exports = {protected}