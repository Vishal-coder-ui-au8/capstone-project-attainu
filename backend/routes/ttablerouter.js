//require('dotenv').config();
const express = require('express');
const ttableRouter = express.Router();
const ttable = require('../controllers/ttableController')


const Timetable = require('../models/TimetableSchema');
//const auth = require("../middleware/auth");

//get the list of timetable items for a standard
//GET localhost:8700/ttable/list?std=first
ttableRouter.get('/list', ttable.getTables);


ttableRouter.put('/update/:id',ttable.editTable)

// ttableRouter.get('/list',(req,res) => {
//     var query = {};
    
//     if(req.query.std){
//         query={"std":req.query.std}
//         sortoption = {_id:1}
//     }
    
//     try{
//     Timetable.find(query).exec((err,ttableitems) => {
//         if(err) return res.status(500).json({
//             error: `Error: ${err}`
//         });
//         return res.status(200).json(ttableitems)
//     }) 
//     }
//     catch(err){
//         console.log(err);        
//         res.status(400).json({
//             error: `Error: ${err}`
//         });
//     }

// })


module.exports = ttableRouter;
