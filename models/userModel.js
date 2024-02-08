const Sequelize = require('sequelize');
const sequleize = require('../config/db');

const userAuth = sequleize.define("jwt", {
    userId : {
      type : Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement: true 
    },
    userName: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userEmail: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userPassword: { 
      type: Sequelize.STRING(60),
      allowNull: false,
     },
    role : {
      type : Sequelize.STRING,
      allowNull: false,
    }

},{
    timestamps: false,
  });



  const UserDetails = sequleize.define('userDetails', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey : true,
      allowNull: false,
    },
    first_Name: {
      type: Sequelize.STRING,
    },
    last_Name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
  
  const UserCountry = sequleize.define('usercountry', {
    country_id : {
      type: Sequelize.INTEGER,
      autoIncrement  :true,
      primaryKey : true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      forignKey : true
    },
    country: {
      type: Sequelize.STRING,
    },
  });
    

UserDetails.hasOne(UserCountry, { foreignKey: 'user_id' });
UserCountry.belongsTo(UserDetails, { foreignKey: 'user_id' });


const userAuthentiacte = async(userEmail,role) => {
  return await userAuth.findOne({
    where: {
     userEmail,
      role
    },        
  });
  }

  const createUser = async(userName,userEmail,hashPassword,role)=>{
   return await userAuth.create({
      userName,
      userEmail,
     userPassword :hashPassword,
      role
    })
  }
module.exports = {userAuth,userAuthentiacte,createUser,UserDetails,UserCountry};