const ExcelJS = require('exceljs');
const path = require('path');
const userTable = require('../models/userModel');
const sequelize = require('../config/db');
const cron = require('node-cron');

const exportToExcel = (req,res) => {
  const job = cron.schedule('*/1 * * * *', async () => {
    const filePath = path.join(__dirname, '../assets', "mydataa.xlsx");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      const userData = await userTable.UserDetails.findAll({
        attributes: ['user_id', 'first_Name', 'last_Name', 'age', 'email'],
      });

      worksheet.addRow(['User ID', 'First Name', 'Last Name', 'Age', 'Email']);

      userData.forEach((user) => {
        worksheet.addRow([
          user.user_id,
          user.first_Name,
          user.last_Name,
          user.age,
          user.email,
        ]);
      });

      await workbook.xlsx.writeFile(filePath);
      console.log('Data exported to Excel successfully');
      // job.stop();
      // res.json({ message: "Data exported successfully" });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }, null, true, "UTC");
}

module.exports = { exportToExcel };
