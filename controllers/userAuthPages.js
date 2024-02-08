const JWT = require('jsonwebtoken')
const crypto = require('crypto');
const userAuth = require('../models/userModel');
const secret_token = crypto.randomBytes(64).toString('hex');
const bcyrpt = require('bcrypt')

const genterateAcessToken = (data)=>{
    return JWT.sign({data},secret_token,{expiresIn : '1h'})
  }
  
  const generateRefreshToken = ()=>{
   return crypto.randomBytes(64).toString('hex');
  }
  
const refresh_Tokens = {}
  
const login = (async(req,res)=>{
    try {
        const { userName, userEmail, userPassword, role } = req.body;
    
        if (!userName || !userEmail || !userPassword || !role) {
            return res.status(400).json({
                error: "Bad Request: Please provide all required fields"
            });
        }
    
        const user = await userAuth.userAuthentiacte(userEmail,role);
        if (!user) {
            return res.status(401).json({ error: 'user not found' });
        }
        
        const passwordMatch = await bcyrpt.compare(userPassword, user.userPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Unauthorized: invalid password ' });
        }

        const Access_token = await genterateAcessToken({ userName, userEmail, userPassword, role });
        const Refresh_token = await generateRefreshToken();
        refresh_Tokens[Refresh_token] = { userName, userEmail, userPassword, role };
        res.status(201).json({ access_token: Access_token, refresh_token: Refresh_token });
    
    } catch (err) {
        console.error(err);

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error: Please check your input data',
                details: err.errors.map(error => ({
                    field: error.path,
                    message: error.message
                }))
            });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
      
  
  })
  
  
  const refresh = ((req,res)=>{

    try {
        const refresh = req.body.refresh_token;
    
        if (!refresh || !refresh_Tokens[refresh]) {
          return res.status(403).json({ error: 'Invalid refresh token' });
        }
    
        const data = refresh_Tokens[refresh];
    
        if (!data) {
          return res.status(500).json({ error: 'Invalid data for refresh token' });
        }
    
        const Access_token = genterateAcessToken(data);
    
        if (!Access_token) {
          return res.status(500).json({ error: 'Error generating access token' });
        }
    
        res.json({ Access_token });
      } catch (err) {
        console.error('Error in refresh route:', err);

        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ error: 'Invalid JWT' });
        }
    
        res.status(500).json({ error: 'Internal Server Error' });
      }   
  })
  
const signUp = async(req,res)=>{
    try{
        const {userName,userEmail,userPassword,role} = req.body
        
        if(!userName || !userEmail || !userPassword || !role ){
            return  res.status(500).json({
                Error : "user not entered userName or userEmail or userPassword or role "
              })     
        }

    const hashPassword = await bcyrpt.hash(userPassword,10)
    
    const user = await userAuth.createUser(userName,userEmail,hashPassword,role)
    res.status(201).json({message : "signUp successful",user})
    }catch(error){
        console.error("Error during signup:", error);

        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map((e) => e.message);
            return res.status(400).json({ error: validationErrors });
        }
        else if (error.name === "SequelizeUniqueConstraintError") {
          return res.status(409).json({ error: "User with this email already exists." });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {login,refresh,secret_token,signUp}