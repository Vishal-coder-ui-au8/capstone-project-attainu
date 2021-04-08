const express = require('express');
const admissionRouter = express.Router();
const admission = require('../controllers/admissionController')
//const auth = require("../middleware/auth");

admissionRouter.post('/upload', admission.upload);

admissionRouter.get('/list', admission.list);

admissionRouter.delete('/delete', admission.delete);

module.exports = admissionRouter;

