const express = require('express');
const feesRouter = express.Router();
const fees = require('../controllers/feesController')
//const auth = require("../middleware/auth");

feesRouter.put('/editdefaulter/:id', fees.editdefaulter);

feesRouter.get('/defaulters', fees.defaulters);

feesRouter.get('/getdetail', fees.getdetail);

module.exports = feesRouter;