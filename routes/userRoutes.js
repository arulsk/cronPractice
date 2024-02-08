const express = require("express");
const route = express.Router();
const mainController = require("../controllers/mainController");
const authenticate_token = require("../middleware/authToken");
route.post('/signUp',mainController.signUpPage);
route.post('/login',mainController.loginPage);
route.post('/refresh',mainController.refreshPage);
route.post('/importExcel',mainController.importExcel)
route.post('/customerSignUp',mainController.createCustomer)
route.get('/getCustomers',authenticate_token('admin'),mainController.getCustomers)
route.get('/getCustomerById/:id',authenticate_token('admin'),mainController.getCustomerById)
route.get('/getUsers',authenticate_token('admin'),mainController.getUsers);
route.get('/getUserById/:id',authenticate_token('admin'),mainController.getUserById);
route.get('/admin',authenticate_token('admin'),mainController.adminPage);
route.get('/user',authenticate_token('user'),mainController.userPage);
route.get('/exportExcel',mainController.exportExcel);
route.put('/updateUser/:id',mainController.updateUser);
route.put('/updateCustomer/:id',mainController.updateCustomer)
route.delete('/deleteUser/:id',authenticate_token('admin'),mainController.deleteUser);
route.delete('/deleteCustomer/:id',authenticate_token('admin'),mainController.delteCustomer)

module.exports = route;