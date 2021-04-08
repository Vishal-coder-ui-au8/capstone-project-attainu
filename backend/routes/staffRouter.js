const express = require('express');
const staffRouter = express.Router();
const staff = require('../controllers/staffController')
//const auth = require("../middleware/auth");

staffRouter.post('/add', staff.add);

staffRouter.get('/paydetail', staff.paydetail);


module.exports = staffRouter;