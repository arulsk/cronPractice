const dbTable = require('../models/userModel')
const cron = require("node-cron")
const createCustomer =  async (req,res)=>{
    try{
    const{user_id,first_Name,last_Name,age,email} = req.body;
    if(!user_id || !first_Name || !last_Name || !age || !email){
        return res.status(500).json({message : "all fields must required!!"}) 
    }
   const created = await dbTable.UserDetails.create({
    user_id,
    first_Name,
    last_Name,
    age,
    email
   })
    res.status(201).json(created)
    }catch(err){
     return res.json({Error : err})
    }
}
const getCustomers = ()=>{
    cron.schedule(' */4 * * * *',async(req,res)=>{
    try{
      const customerData = await dbTable.UserDetails.findAll()
      res.status(201).json(customerData)
    }catch(err){
        res.status(500).json({message : err})

    }
})}

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await dbTable.UserDetails.findOne({
            where: { user_id: customerId }
        });
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        console.error("Error fetching customer by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const { first_Name, last_Name, age, email } = req.body;

        const updatedRows = await dbTable.UserDetails.update(
            { first_Name, last_Name, age, email },
            { where: { user_id: customerId } }
        );

        if (updatedRows === 0) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.status(200).json({ message: "Customer updated successfully" });
        }
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedRows = await dbTable.UserDetails.destroy({
            where: { user_id: customerId }
        });

        if (deletedRows === 0) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.status(200).json({ message: "Customer deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer };



